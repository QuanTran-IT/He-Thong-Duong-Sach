package com.duongsach.backend.repository;

import com.duongsach.backend.entity.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UserRepository {
    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Optional<User> findByEmail(String email) {
        List<User> users = jdbcTemplate.query(
                "SELECT UserId, FullName, Email, Phone, PasswordHash FROM Users WHERE Email = ?",
                (resultSet, rowNumber) -> mapUser(resultSet),
                email);
        return users.stream().findFirst();
    }

    public List<User> findAllUsers() {
        return jdbcTemplate.query(
                "SELECT UserId, FullName, Email, Phone, PasswordHash FROM Users",
                (resultSet, rowNumber) -> mapUser(resultSet));
    }

    private User mapUser(java.sql.ResultSet resultSet) throws java.sql.SQLException {
        return new User(
                resultSet.getString("UserId"),
                resultSet.getString("FullName"),
                resultSet.getString("Email"),
                resultSet.getString("Phone"),
                resultSet.getString("PasswordHash"));
    }
}