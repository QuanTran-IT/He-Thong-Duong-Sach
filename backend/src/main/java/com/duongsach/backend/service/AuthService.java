package com.duongsach.backend.service;

import com.duongsach.backend.dto.LoginRequest;
import com.duongsach.backend.dto.UserResponse;
import com.duongsach.backend.entity.User;
import com.duongsach.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import com.duongsach.backend.dto.AdminLoginRequest;
import com.duongsach.backend.dto.AdminResponse;
import com.duongsach.backend.entity.Admin;
import com.duongsach.backend.repository.AdminRepository;
@Service
public class AuthService {
    private final UserRepository userRepository;
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponse login(LoginRequest request) {
        if (request == null || isBlank(request.getEmail()) || isBlank(request.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email và mật khẩu là bắt buộc.");
        }

        User user = userRepository.findByEmail(request.getEmail()).orElse(null);
        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Email hoặc mật khẩu không đúng.");
        }

        return new UserResponse(user);
    }

    public AdminResponse adminLogin(AdminLoginRequest request) {
        if (request == null || isBlank(request.getUsername()) || isBlank(request.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tên đăng nhập và mật khẩu là bắt buộc.");
        }

        Admin admin = adminRepository.findByUsername(request.getUsername()).orElse(null);
        if (admin == null || admin.getUser() == null || !passwordEncoder.matches(request.getPassword(), admin.getUser().getPasswordHash())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Tên đăng nhập hoặc mật khẩu không đúng.");
        }

        return new AdminResponse(admin);
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}