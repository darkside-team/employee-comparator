package ru.darkside.scaffold.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HomeController {

    @RequestMapping(value = "/", method=RequestMethod.GET)
    public String index() {
        return "index";
    }

    @RequestMapping(value = "/app/**", method=RequestMethod.GET)
    public String app() {
        return "index";
    }
}
