package com.study.SpringSecurityMybatis.controller;

import com.study.SpringSecurityMybatis.exception.AccessTokenValidException;
import com.study.SpringSecurityMybatis.exception.SignupException;
import com.study.SpringSecurityMybatis.exception.ValidException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionController {

    @ExceptionHandler(ValidException.class)
    public ResponseEntity<?> validException(ValidException e) {
        return ResponseEntity.badRequest().body(e.getFieldErrors());
    }

    @ExceptionHandler(SignupException.class)
    public ResponseEntity<?> signupException(SignupException e) {
        return ResponseEntity.internalServerError().body(e.getMessage());
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<?> usernameException(UsernameNotFoundException e) {
        return ResponseEntity.internalServerError().body(e.getMessage());
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<?> passwordException(BadCredentialsException e) {
        return ResponseEntity.internalServerError().body(e.getMessage());
    }

    @ExceptionHandler(AccessTokenValidException.class)
    public ResponseEntity<?> accessTokenException(AccessTokenValidException e) {
        return ResponseEntity.status(403).body(false);
    }
}
