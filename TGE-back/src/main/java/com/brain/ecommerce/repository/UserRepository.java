package com.brain.ecommerce.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.brain.ecommerce.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByUsername(String username);

  Optional<User> findByEmail(String email);

  Boolean existsByUsername(String username);

  Boolean existsByEmail(String email);
/* Email verif query */
  @Query("SELECT u FROM User u WHERE u.verificationCode = ?1")
  public User findByVerificationCode(String code);

  /* reset password query */
  @Query("SELECT u FROM User u WHERE u.email = ?1")
  public User UserByEmail(String email);
  
  public User findByResetPasswordToken(String resetPasswordToken);
}
