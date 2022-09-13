package com.example.home.login.controller;

import com.example.home.common.ResCode;
import com.example.home.join.request.JoinReq;
import com.example.home.login.request.AccessReq;
import com.example.home.login.request.LoginReq;
import com.example.home.login.response.LoginRes;
import com.example.home.login.service.HomeLoginService;
import com.example.home.util.WebUtil;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;

@RestController
@RequestMapping("/login/ajax")
public class LoginRestController {

    private final Log log = LogFactory.getLog(LoginRestController.class);

    @Autowired
    private HomeLoginService homeLoginService;

    @RequestMapping(value = "/login")
    public ResCode login(HttpServletRequest req, HttpServletResponse res, LoginReq loginReq , HttpSession session) throws UnsupportedEncodingException, GeneralSecurityException {
        log.debug("/login/ajax/login");
        ResCode result = new ResCode();
        result.setRetcode("0000");
        result.setRetmsg("정상");

        if (loginReq.getUserId() == null || loginReq.getUserId().isEmpty()) {
            result.setRetcode("9999");
            result.setRetmsg("아이디를 입력해주세요.");
            return result;
        } else if (loginReq.getUserPwd() == null || loginReq.getUserPwd().isEmpty()) {
            result.setRetcode("9999");
            result.setRetmsg("비밀번호를 입력해주세요.");
            return result;
        }

        AccessReq accessReq = new AccessReq();
        accessReq.setUserId(loginReq.getUserId());
        accessReq.setIp(WebUtil.getIp(req));

        LoginRes loginRes = homeLoginService.login(loginReq);

        //아이디, 비밀번호 일치 하지 않았을 경우
        if(loginRes == null){
            result.setRetcode("9999");
            result.setRetmsg("아이디/비밀번호 확인해주세요");

        }


        session.setAttribute("loginRes", loginRes);

        return result;
    }

    /**
     * 비밀번호 찾기
     * */
    @ResponseBody
    @RequestMapping(value = "/findPw", method = RequestMethod.POST)
    public ResCode findPw(HttpServletRequest req, HttpServletResponse res, LoginReq loginReq , HttpSession session) throws UnsupportedEncodingException, GeneralSecurityException {
        log.debug("/join/ajax/findPw");
        ResCode result = new ResCode();
        result.setRetcode("0000");
        result.setRetmsg("정상");



    }

}
