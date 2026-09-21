package com.duongsach.backend.dto;

public class LoginResponse {
    private final String message;
    private final UserResponse user;

    public LoginResponse(String message, UserResponse user) {
        this.message = message;
        this.user = user;
    }

    public String getMessage() {
        return message;
    }

    public UserResponse getUser() {
        return user;
    }
}