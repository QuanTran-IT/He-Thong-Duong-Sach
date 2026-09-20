package com.duongsach.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.duongsach.backend.entity.User;

public class UserResponse {
    @JsonProperty("UserId")
    private final String userId;
    @JsonProperty("FullName")
    private final String fullName;
    @JsonProperty("Email")
    private final String email;
    @JsonProperty("Phone")
    private final String phone;

    public UserResponse(User user) {
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