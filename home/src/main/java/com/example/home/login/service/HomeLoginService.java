package com.example.home.login.service;

import com.example.common.model.login.Login;
import com.example.common.model.login.param.LoginParam;
import com.example.common.service.LoginService;
import com.example.home.login.request.LoginReq;
import com.example.home.login.response.LoginRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HomeLoginService {

    @Autowired
    private LoginService loginService;

    /**
     * 로그인
     * */
    public LoginRes login(LoginReq loginReq){
        LoginParam loginParam = new LoginParam(loginReq.getUserId(),loginReq.getUserPwd());
        Login login = loginService.login(loginParam);
        if(login == null){ //아이디 또는 비밀번호 불일치
            return null;
        }
        return new LoginRes(login);
    }
}
