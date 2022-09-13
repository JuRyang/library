package com.example.home.join.service;

import com.example.common.model.Join;
import com.example.common.service.JoinService;
import com.example.home.join.request.JoinReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HomeJoinService {

    @Autowired
    private JoinService joinService;

    /**
     * 회원가입
     * */
    public int insertJoin(JoinReq param){
        Join join = new Join();
        join.setUser_name(param.getUserName());
        join.setUser_id(param.getUserId());
        join.setUser_pwd(param.getUserPwd());
        join.setUser_tel(param.getUserTel());
        join.setAggrement(param.getAggrement());
        return joinService.insertJoin(join);
    }

    /**
     * 아이디 중복체크
     * */
    public int overCheckId(String userId){
        return joinService.overCheckId(userId);
    }

}
