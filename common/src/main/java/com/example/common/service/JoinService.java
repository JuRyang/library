package com.example.common.service;

import com.example.common.mapper.JoinMapper;
import com.example.common.model.Join;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JoinService {

    @Autowired
    public JoinMapper joinMapper;

    /**
     * 회원가입
     * */
    public int insertJoin(Join join){
        return joinMapper.insertJoin(join);
    }

    /**
     * 아이디중복체크
     * */
    public int overCheckId(String user_id){
        return joinMapper.overCheckId(user_id);
    }

}
