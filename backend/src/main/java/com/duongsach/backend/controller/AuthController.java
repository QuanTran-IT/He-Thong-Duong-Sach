package com.duongsach.backend.controller;

import com.duongsach.backend.dto.AdminLoginRequest;
import com.duongsach.backend.dto.AdminResponse;
import com.duongsach.backend.dto.LoginRequest;
import com.duongsach.backend.dto.LoginResponse;
import com.duongsach.backend.dto.UserResponse;
import com.duongsach.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        UserResponse user = authService.login(request);
        return ResponseEntity.ok(new LoginResponse("Đăng nhập thành công.", user));
    }

    @PostMapping("/admin/login")
    public ResponseEntity<AdminResponse> adminLogin(@RequestBody AdminLoginRequest request) {
        AdminResponse admin = authService.adminLogin(request);
        return ResponseEntity.ok(admin);
    }
}