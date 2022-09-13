package com.example.common.model.login.param;

import com.example.common.util.SHA512Util;
import lombok.Data;

@Data
public class LoginParam {
    private String user_id;
    private String user_pwd;

    public LoginParam(String userId, String userPwd) {
        this.user_id = userId;
        this.user_pwd = new SHA512Util().encryptSHA512(userPwd);

    }

}
