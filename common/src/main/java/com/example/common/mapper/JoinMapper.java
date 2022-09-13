package com.example.common.mapper;

import com.example.common.model.Join;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface JoinMapper {

    /**
     * 회원가입
     * */
    public int insertJoin(Join join);

    /**
     * 아이디 중복 체크
     * */
    public int overCheckId(String user_id);

}
