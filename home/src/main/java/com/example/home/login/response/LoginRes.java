package com.example.home.login.response;

import com.example.common.model.login.Login;
import lombok.Data;

@Data
public class LoginRes {
    private Integer userNo;
    private String userName;
    private String userTel;
    private String userId;
    private String userPwd;

    public LoginRes(Login login){
        this.userNo = login.getUser_no();
        this.userName = login.getUser_name();
        this.userTel = login.getUser_tel();
        this.userId = login.getUser_id();
        this.userPwd = login.getUser_pwd();
    }
}
