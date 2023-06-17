package com.brain.ecommerce.security.services;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.brain.ecommerce.models.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class UserDetailsImpl implements UserDetails {
  private static final long serialVersionUID = 1L;

  private Long id;

  private String username;
	private String firstName;
	private String lastName;
  private String email;

  @JsonIgnore
  private String password;

  private Collection<? extends GrantedAuthority> authorities;

/*   email verification attributes
 */

private boolean isEnabled;
public UserDetailsImpl(Long id, String username,String firstName,String lastName, String email, String password,
      Collection<? extends GrantedAuthority> authorities, boolean isEnabled) {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
		this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.authorities = authorities;
    this.isEnabled = isEnabled;
  }

/* fin */

  public UserDetailsImpl(Long id, String username,String firstName,String lastName, String email, String password,
      Collection<? extends GrantedAuthority> authorities) {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
		this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.authorities = authorities;
  }

  public static UserDetailsImpl build(User user) {
    List<GrantedAuthority> authorities = user.getRoles().stream()
        .map(role -> new SimpleGrantedAuthority(role.getName().name()))
        .collect(Collectors.toList());

    return new UserDetailsImpl(
        user.getId(), 
        user.getUsername(), 
        user.getFirstName(),
        user.getLastName(),
        user.getEmail(),
        user.getPassword(), 
        authorities,
        user.isEnabled());
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  public Long getId() {
    return id;
  }

  public String getEmail() {
    return email;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return username;
  }
  public String getFirstName() {
		return firstName;
	}


	public String getLastName() {
		return lastName;
	}


  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return isEnabled;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;
    UserDetailsImpl user = (UserDetailsImpl) o;
    return Objects.equals(id, user.id);
  }
}
