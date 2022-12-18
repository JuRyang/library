package com.example.home.credit.controller;

import com.example.home.join.controller.JoinController;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("credit")
public class CredtiController {

    private final Log log = LogFactory.getLog(JoinController.class);

    @RequestMapping(value = "/credit")
    public ModelAndView reqeust(HttpServletRequest req, HttpServletResponse res){
        log.debug("/credit/reqeust");
        ModelAndView mav = new ModelAndView("/view/credit/credit");
        return mav;
    }
}
