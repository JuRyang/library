package com.example.home.join.request;

import com.example.common.model.Join;
import com.example.common.util.SHA512Util;
import lombok.Data;

@Data
public class JoinReq {
    private Integer userNo;
    private String userName;
    private String userTel;
    private String userId;
    private String userPwd;
    private String regDt;
    private String aggrement;

    public String getUserPwd() {
        if(this.userPwd != null && !this.userPwd.isEmpty()){
            return new SHA512Util().encryptSHA512(this.userPwd);
        }
        return userPwd;
    }

}
