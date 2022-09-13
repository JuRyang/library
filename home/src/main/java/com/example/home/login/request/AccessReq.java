package com.example.home.login.request;

import lombok.Data;

@Data
public class AccessReq {
    private int userNo;
    private String userId;
    private String ip;

}
