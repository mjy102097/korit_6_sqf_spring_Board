package com.study.SpringSecurityMybatis.aspect;

import com.study.SpringSecurityMybatis.dto.request.ReqOAuth2signupDto;
import com.study.SpringSecurityMybatis.dto.request.ReqSignupDto;
import com.study.SpringSecurityMybatis.exception.ValidException;
import com.study.SpringSecurityMybatis.service.UserService;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

@Component
@Aspect
public class ValidAspect {

    @Autowired
    private UserService userService;

    @Pointcut("@annotation(com.study.SpringSecurityMybatis.aspect.annotation.ValidAop)")
    public void pointCut() {}

    @Around("pointCut()")
    public Object around(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        Object[] args = proceedingJoinPoint.getArgs();
        BeanPropertyBindingResult bindingResult = null;
        for(Object arg : args) {
            if(arg.getClass() == BeanPropertyBindingResult.class) {
                bindingResult = (BeanPropertyBindingResult) arg;
                break;
            }
        }

        if(proceedingJoinPoint.getSignature().getName().equals("signup")) {
            validSignup(args, bindingResult);
        }
        if(proceedingJoinPoint.getSignature().getName().equals("oAuth2Signup")) {
            validOAuth2SignupDto(args, bindingResult);
        }

        if(bindingResult.hasErrors()) {
            throw new ValidException("유효성 검사 오류", bindingResult.getFieldErrors());
        }

        return proceedingJoinPoint.proceed();
    }

    private void validSignup(Object[] args, BeanPropertyBindingResult bindingResult) {
        for(Object arg : args) {
            if(arg.getClass() == ReqSignupDto.class) {
                ReqSignupDto dto = (ReqSignupDto) arg;
                if(!dto.getPassword().equals(dto.getCheckPassword())) {
                    FieldError fieldError = new FieldError("checkPassword", "checkPassword", "비밀번호가 일치하지 않습니다.");
                    bindingResult.addError(fieldError);
                }
                if(userService.isDuplicateUsername(dto.getUsername())) {
                    FieldError fieldError = new FieldError("username", "username", "이미 존재하는 사용자`이름입니다.");
                    bindingResult.addError(fieldError);
                }
                break;
            }
        }
    }

    private void validOAuth2SignupDto(Object[] args, BeanPropertyBindingResult bindingResult) {
        for(Object arg : args) {
            if(arg.getClass() == ReqOAuth2signupDto.class) {
                ReqOAuth2signupDto dto = (ReqOAuth2signupDto) arg;
                if(!dto.getPassword().equals(dto.getCheckPassword())) {
                    FieldError fieldError = new FieldError("checkPassword", "checkPassword", "비밀번호가 일치하지 않습니다.");
                    bindingResult.addError(fieldError);
                }
                if(userService.isDuplicateUsername(dto.getUsername())) {
                    FieldError fieldError = new FieldError("username", "username", "이미 존재하는 사용자`이름입니다.");
                    bindingResult.addError(fieldError);
                }
                break;
            }
        }
    }


}
