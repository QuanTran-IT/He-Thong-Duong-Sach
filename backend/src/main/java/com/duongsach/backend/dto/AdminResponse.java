package com.duongsach.backend.dto;

import com.duongsach.backend.entity.Admin;

public class AdminResponse {
    private String staffId;
    private String username;
    private String fullName;
    private String email;

    public AdminResponse(Admin admin) {
        this.staffId = admin.getStaffId();
        this.username = admin.getUsername();
        if (admin.getUser() != null) {
            this.fullName = admin.getUser().getFullName();
            this.email = admin.getUser().getEmail();
        }
    }

    public String getStaffId() {
        return staffId;
    }

    public String getUsername() {
        return username;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }
}
