package com.lineup.backend.controller;

import com.lineup.backend.dto.LoginRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        return "Login endpoint placeholder";
    }

    @PostMapping("/register")
    public String register() {
        return "Register endpoint placeholder";
    }
}