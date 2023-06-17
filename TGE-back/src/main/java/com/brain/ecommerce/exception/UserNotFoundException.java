package com.brain.ecommerce.exception;

public class UserNotFoundException extends Exception {
    public UserNotFoundException(String errorMessage) {
       super(errorMessage);
    }
 }