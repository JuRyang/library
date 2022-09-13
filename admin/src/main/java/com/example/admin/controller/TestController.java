package com.example.admin.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/admin")
public class TestController {

    private final Log log = LogFactory.getLog(TestController.class);

    @RequestMapping(value = "/test")
    public ModelAndView join(HttpServletRequest req, HttpServletResponse res){
        log.debug("/test");
        ModelAndView mav = new ModelAndView("/view/index");
        return mav;
    }

    @RequestMapping(value = "/register")
    public ModelAndView register(HttpServletRequest req, HttpServletResponse res){
        log.debug("/register");
        ModelAndView mav = new ModelAndView("/view/register");
        return mav;
    }

    @RequestMapping(value = "/tables")
    public ModelAndView login(HttpServletRequest req, HttpServletResponse res){
        log.debug("/tables");
        ModelAndView mav = new ModelAndView("/view/tables");
        return mav;
    }


}
