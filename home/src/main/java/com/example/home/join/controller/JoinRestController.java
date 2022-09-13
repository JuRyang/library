package com.example.home.join.controller;

import com.example.home.common.ResCode;
import com.example.home.join.request.JoinReq;
import com.example.home.join.service.HomeJoinService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/join/ajax")
public class JoinRestController {

    private final Log log = LogFactory.getLog(JoinRestController.class);

    @Autowired
    private HomeJoinService joinService;

    /**
     * 회원가입
     * */
    @ResponseBody
    @RequestMapping(value = "/insertJoin", method = RequestMethod.POST)
    public ResCode insertJoin(HttpServletRequest req, JoinReq param, HttpSession session){
        log.debug("/join/ajax/insertJoin");
        ResCode result = new ResCode();
        result.setRetcode("0000");
        result.setRetmsg("정상");

        if (param.getUserId() == null || param.getUserId().isEmpty()) {
            result.setRetcode("9999");
            result.setRetmsg("아이디를 입력해주세요.");
            return result;
        } else if (param.getUserPwd() == null || param.getUserPwd().isEmpty()) {
            result.setRetcode("9999");
            result.setRetmsg("비밀번호를 입력해주세요.");
            return result;
        } else if (param.getUserTel() == null || param.getUserTel().isEmpty()){
            result.setRetcode("9999");
            result.setRetmsg("전화번호를 입력해주세요.");
            return result;
        } else if (param.getUserName() == null || param.getUserName().isEmpty()){
            result.setRetcode("9999");
            result.setRetmsg("이름 입력해주세요.");
            return result;
        } else if (param.getAggrement() == null || param.getAggrement().isEmpty()){
            result.setRetcode("9999");
            result.setRetmsg("동의해주세요.");
            return result;
        }


        if(joinService.overCheckId(param.getUserId()) != 0){
            result.setRetcode("9999");
            result.setRetmsg("이미 존재한 아이디입니다.");
            return result;
        }

        if(joinService.insertJoin(param) == 0){
            result.setRetcode("9999");
            result.setRetmsg("회원가입에 실패하였습니다.");
            return result;
        }

        return result;
    }






    }
