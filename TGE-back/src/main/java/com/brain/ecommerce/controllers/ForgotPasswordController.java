package com.brain.ecommerce.controllers;

import java.io.UnsupportedEncodingException;
import java.util.Optional;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brain.ecommerce.models.User;
import com.brain.ecommerce.services.UserService;
import com.brain.ecommerce.repository.UserRepository;


@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/reset")
public class ForgotPasswordController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

 /*    @GetMapping("/{token}")
    public User verifiedUser(@PathVariable String token) {
        return userRepository.findByVerificationCode(token);
    }*/

    @PutMapping("password/{email}")
    public User saveResetPasswordToken(@PathVariable("email") String email) throws UnsupportedEncodingException, MessagingException{
         userService.savePasswordToken(email);
         return userRepository.UserByEmail(email);
    }
 
    @PutMapping("/{token}")
    public User resetPassword(@PathVariable("token") String token, @RequestBody User user)
            throws UnsupportedEncodingException, MessagingException {
        return userService.resetPassword(token, user);
    }
 
}