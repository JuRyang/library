package com.example.common.mapper;

import com.example.common.model.Join;
import com.example.common.model.login.Login;
import com.example.common.model.login.param.LoginParam;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginMapper {

    /**
     * 회원 로그인
     * */
    public Login login(LoginParam loginParam);

}
