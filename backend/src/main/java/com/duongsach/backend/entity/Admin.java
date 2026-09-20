package com.duongsach.backend.entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Staffs")
public class Admin {
    @Id
    @Column(name = "StaffID")
    private String staffId;

     @OneToOne
    @JoinColumn(name = "UserID")
    private User user;

    @Column(name = "username")
    private String username;

    public Admin() {
    }

    public Admin(String staffId, User user, String username) {
        this.staffId = staffId;
        this.user = user;
        this.username = username;
    }
   
    public String getStaffId() {
        return staffId;
    }

    public User getUser() {
        return user;
    }

    public String getUsername() {
        return username;
    }

}