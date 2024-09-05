package com.study.SpringSecurityMybatis.controller;


import com.study.SpringSecurityMybatis.aspect.annotation.ValidAop;
import com.study.SpringSecurityMybatis.dto.request.*;
import com.study.SpringSecurityMybatis.entity.OAuth2User;
import com.study.SpringSecurityMybatis.exception.SignupException;
import com.study.SpringSecurityMybatis.service.OAuth2Service;
import com.study.SpringSecurityMybatis.service.TokenService;
import com.study.SpringSecurityMybatis.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private UserService userService;
    @Autowired
    private OAuth2Service oAuth2Service;
    @Autowired
    private TokenService tokenService;

    @ValidAop
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody ReqSignupDto dto, BindingResult bindingResult) throws SignupException {
        log.info("{}", dto);
        return ResponseEntity.ok().body(userService.insertUserAndRoles(dto));
    }

    @ValidAop
    @PostMapping("/signin")
    public ResponseEntity<?> signup(@Valid @RequestBody ReqSigninDto dto, BindingResult bindingResult) {
        log.info("{}", dto);
        return ResponseEntity.ok().body(userService.generatedAccessToken(dto));
    }

    @ValidAop
    @PostMapping("/oauth2/merge")
    public ResponseEntity<?> oAuth2Merge(@Valid @RequestBody ReqOAuth2MergeDto dto, BindingResult bindingResult) {
        OAuth2User oAuth2User = userService.mergeSignin(dto);
        oAuth2Service.merge(oAuth2User);
        return ResponseEntity.ok().body(true);
    }

    @GetMapping("/access")
    public ResponseEntity<?> access(ReqAccessDto dto) {
        log.info("{}", dto);
        return ResponseEntity.ok().body(tokenService.isValidAccessToken(dto.getAccessToken()));
    }

    @ValidAop
    @PostMapping("/oauth2/signup")
    public ResponseEntity<?> oAuth2Signup(@Valid @RequestBody ReqOAuth2signupDto oAuth2signupDto, BindingResult bindingResult) throws SignupException {
        oAuth2Service.signup(oAuth2signupDto);
        return ResponseEntity.ok().body(true);
    }
}
