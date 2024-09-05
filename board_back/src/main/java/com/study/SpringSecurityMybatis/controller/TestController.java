package com.study.SpringSecurityMybatis.controller;

import com.study.SpringSecurityMybatis.security.principal.PrincipalUser;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/test")
    public ResponseEntity<?> test() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        PrincipalUser principalUser = (PrincipalUser) auth.getPrincipal();
        return ResponseEntity.ok().body(principalUser);
    }

}
