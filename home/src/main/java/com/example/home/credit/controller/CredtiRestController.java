package com.example.home.credit.controller;

import com.example.home.common.ResCode;
import com.example.home.join.controller.JoinController;
import com.example.home.join.request.JoinReq;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/rest/credit")
public class CredtiRestController {

    private final Log log = LogFactory.getLog(JoinController.class);

    @ResponseBody
    @RequestMapping(value = "/insertCredit", method = RequestMethod.POST)
    public ResCode insertJoin(HttpServletRequest req, JoinReq param, HttpSession session){
        log.debug("/rest/credit/insertCredit");
        ResCode result = new ResCode();
        result.setRetcode("0000");
        result.setRetmsg("정상");

        return result;

    }
}
