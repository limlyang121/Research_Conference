package com.myapp.ResearchConference.Web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class GeneralController {
    @GetMapping("/")
    public String landing(){
        return "landing";
    }

    @GetMapping("/home")
    public String homePage(){
        return "home";
    }
}
