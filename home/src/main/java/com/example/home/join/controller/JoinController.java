package com.example.home.join.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/home")
public class JoinController {

    private final Log log = LogFactory.getLog(JoinController.class);

    @RequestMapping(value = "/join")
    public ModelAndView join(HttpServletRequest req, HttpServletResponse res){
        log.debug("/join");
        ModelAndView mav = new ModelAndView("/view/join/join");
        return mav;
    }


}
