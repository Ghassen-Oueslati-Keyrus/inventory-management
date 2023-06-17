package com.brain.ecommerce.controllers;

import java.io.UnsupportedEncodingException;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.mail.MessagingException;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brain.ecommerce.models.ERole;
import com.brain.ecommerce.models.Role;
import com.brain.ecommerce.models.User;
import com.brain.ecommerce.payload.request.ChangePasswordRequest;
import com.brain.ecommerce.payload.request.ChangeProfileRequest;
import com.brain.ecommerce.payload.request.LoginRequest;
import com.brain.ecommerce.payload.request.SignupRequest;
import com.brain.ecommerce.payload.response.UserInfoResponse;
import com.brain.ecommerce.payload.response.MessageResponse;
import com.brain.ecommerce.repository.RoleRepository;
import com.brain.ecommerce.repository.UserRepository;
import com.brain.ecommerce.security.jwt.JwtUtils;
import com.brain.ecommerce.security.services.UserDetailsImpl;
import com.brain.ecommerce.services.UserService;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  private UserService userService;

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @GetMapping("/username/{username}")
  public Optional<User> usernameExists(@PathVariable String username) {
    return userRepository.findByUsername(username);
  }

  @GetMapping("/email/{email}")
  public Optional<User> getUserByEmail(@PathVariable String email) {
    return userRepository.findByEmail(email);
  }

  @GetMapping("/verify/{code}")
  public User verifiedUser(@PathVariable String code) {
    return userRepository.findByVerificationCode(code);
  }

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager
        .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);

    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

    List<String> roles = userDetails.getAuthorities().stream()
        .map(item -> item.getAuthority())
        .collect(Collectors.toList());

    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
        .body(new UserInfoResponse(userDetails.getId(),
            userDetails.getUsername(),
            userDetails.getFirstName(),
            userDetails.getLastName(),
            userDetails.getEmail(),
            roles));
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest)
      throws UnsupportedEncodingException, MessagingException {
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
    }

    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Error: Email déjà utilisé!"));
    }

    // Create new user's account
    User user = new User(signUpRequest.getUsername(),
        signUpRequest.getFirstName(),
        signUpRequest.getLastName(),
        signUpRequest.getEmail(),
        encoder.encode(signUpRequest.getPassword()));

    Set<String> strRoles = signUpRequest.getRole();
    Set<Role> roles = new HashSet<>();
    if (strRoles == null) {
      Role userRole = roleRepository.findByName(ERole.ROLE_USER)
          .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(userRole);
    } else {
      strRoles.forEach(role -> {
        switch (role) {
          case "admin":
            Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(adminRole);

            break;
            case "mod":
					Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(modRole);

					break;
          default:
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        }
      });
    }

    user.setRoles(roles);
    /* Including the email verification part */
    userService.saveUser(user);
    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }
  
  @PostMapping("/signout")
  public ResponseEntity<?> logoutUser() {
    ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
        .body(new MessageResponse("You've been signed out!"));
  }

  @PutMapping("/changePassword")
public ResponseEntity<?> changeUserPassword(@RequestBody ChangePasswordRequest changePasswordRequest) {
    String username = changePasswordRequest.getUsername();
    User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

    if (!encoder.matches(changePasswordRequest.getCurrentPassword(), user.getPassword())) {
        return ResponseEntity.badRequest().body(new MessageResponse("Le mot de passe courant est incorrect"));
    }

    user.setPassword(encoder.encode(changePasswordRequest.getNewPassword()));
    userRepository.save(user);
    return ResponseEntity.ok(new MessageResponse("Mot de passe changé avec succès!"));
}

  @PutMapping("/verify/{code}")
  public User verifyUser(@PathVariable("code") String code, @RequestBody User user) {
    return userService.updateuser(code, user);
  }

  @PutMapping("/change-profile")
  public User changeProfile(@RequestBody ChangeProfileRequest request){
    Optional<User> currentUser = userRepository.findById(request.getId());
    if (currentUser.isPresent()) {
      User user = currentUser.get();
      // Mettre à jour les données de l'utilisateur avec les données fournies
      user.setFirstName(request.getFirstName());
      user.setLastName(request.getLastName());
      user.setUsername(request.getUsername());
      // Enregistrer les modifications de l'utilisateur
      userRepository.save(user);
      return user;
  } 
  else{
    return null;
  }
  }
}
