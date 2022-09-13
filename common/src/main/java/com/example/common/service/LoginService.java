package com.example.common.service;

import com.example.common.mapper.JoinMapper;
import com.example.common.mapper.LoginMapper;
import com.example.common.model.Join;
import com.example.common.model.login.Login;
import com.example.common.model.login.param.LoginParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    public LoginMapper loginMapper;

    /**
     * 로그인
     * */
    public Login login(LoginParam loginParam){
        return loginMapper.login(loginParam);
    }

}
