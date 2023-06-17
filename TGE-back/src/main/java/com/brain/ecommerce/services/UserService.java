package com.brain.ecommerce.services;

import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.brain.ecommerce.models.User;
import com.brain.ecommerce.repository.UserRepository;

import net.bytebuddy.utility.RandomString;

@Service
public class UserService {
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    public void saveUser(User user) throws UnsupportedEncodingException, MessagingException {
        /* email verification part */

        String randomCode = RandomString.make(64);
        user.setVerificationCode(randomCode);
        user.setEnabled(false);

        /* end */
        userRepository.save(user);

        sendVerificationEmail(user, "http://localhost:4200/mail");
    }

    private void sendVerificationEmail(User user, String siteURL)
            throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
        String fromAddress = "hajlaoui.aziz.tge@gmail.com";
        String senderName = "TGE";
        String subject = "Veuillez vérifier votre enregistrement, s'il vous plaît.";
        String content = "Cher/Chère [[name]],<br>"
                + "Veuillez cliquer sur le lien ci-dessous pour vérifier votre inscription.<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFIER</a></h3>"
                + "Merci,<br>"
                + "TGE.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getFullName());
        String verifyURL = siteURL + "/verify/?code=" + user.getVerificationCode();

        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);

        mailSender.send(message);

    }

    public boolean verify(String verificationCode) {
        User user = userRepository.findByVerificationCode(verificationCode);

        if (user == null || user.isEnabled()) {
            return false;
        } else {
            user.setVerificationCode(null);
            user.setEnabled(true);
            userRepository.save(user);

            return true;
        }

    }

    public User updateuser(String code, User user) {
        // TODO Auto-generated method stub
        User existinguser = userRepository.findByVerificationCode(code);
        existinguser.setVerificationCode(null);
        existinguser.setEnabled(true);

        return userRepository.save(existinguser);
    }

    /* reset password methods */

    public void savePasswordToken(String email) throws UnsupportedEncodingException, MessagingException {
        User user = userRepository.UserByEmail(email);
        String randomCode = RandomString.make(30);
        user.setResetPasswordToken(randomCode);
        userRepository.save(user);
        sendResetPasswordEmail(user, "http://localhost:4200/password");
    }

    private void sendResetPasswordEmail(User user, String siteURL)
            throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
        String fromAddress = "hajlaoui.aziz.tge@gmail.com";
        String senderName = "TGE";
        String subject = "Veuillez modifier votre mot de passe, s'il vous plaît.";
        String content = "Cher/Chère [[name]],<br>"
                + "Veuillez cliquer sur le lien ci-dessous pour récupérer votre mot de passe:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">RÉINITIALISER</a></h3>"
                + "Merci,<br>"
                + "TGE.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getFullName());
        String verifyURL = siteURL + "/reset/?token=" + user.getResetPasswordToken();

        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);

        mailSender.send(message);

    }

    public User resetPassword(String token, User user) {
        User existingUser = userRepository.findByResetPasswordToken(token);
        existingUser.setResetPasswordToken(null);
        existingUser.setPassword((encoder.encode(user.getPassword())));
        return userRepository.save(existingUser);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
