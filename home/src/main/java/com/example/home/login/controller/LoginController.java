package com.example.home.login.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/home/login")
public class LoginController {

    private final Log log = LogFactory.getLog(LoginController.class);

    @RequestMapping(value = "")
    public ModelAndView login(HttpServletRequest req, HttpServletResponse res ) {
        log.info("/home/login");
        ModelAndView mav = new ModelAndView("/view/login/login");
        return mav;
    }

    @RequestMapping(value = "findpw")
    public ModelAndView findpw(HttpServletRequest req, HttpServletResponse res ) {
        log.info("/home/findpw");
        ModelAndView mav = new ModelAndView("/view/login/findPw");
        return mav;
    }

}
