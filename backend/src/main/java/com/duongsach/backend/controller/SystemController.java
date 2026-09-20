package com.duongsach.backend.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.duongsach.backend.entity.User;
import com.duongsach.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class SystemController {
    private final UserRepository userRepository;

    public SystemController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/health")
    public HealthResponse health() {
        return new HealthResponse(true, "duong-sach-api");
    }

    @GetMapping("/test-users")
    public List<UserSummary> testUsers() {
        return userRepository.findAllUsers().stream()
                .map(UserSummary::new)
                .collect(Collectors.toList());
    }

    public static class HealthResponse {
        private final boolean ok;
        private final String service;

        public HealthResponse(boolean ok, String service) {
            this.ok = ok;
            this.service = service;
        }

        public boolean isOk() {
            return ok;
        }

        public String getService() {
            return service;
        }
    }

    public static class UserSummary {
        @JsonProperty("UserId")
        private final String userId;
        @JsonProperty("FullName")
        private final String fullName;
        @JsonProperty("Email")
        private final String email;
        @JsonProperty("Phone")
        private final String phone;

        public UserSummary(User user) {
            this.userId = user.getUserId();
            this.fullName = user.getFullName();
            this.email = user.getEmail();
            this.phone = user.getPhone();
        }

        public String getUserId() {
            return userId;
        }

        public String getFullName() {
            return fullName;
        }

        public String getEmail() {
            return email;
        }

        public String getPhone() {
            return phone;
        }
    }
}