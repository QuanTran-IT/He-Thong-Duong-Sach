package com.duongsach.backend;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BcryptGenTest {

    @Test
    public void generateHash() {
        System.out.println("HASH_START");
        System.out.println(new BCryptPasswordEncoder().encode("duongsach@2026"));
        System.out.println("HASH_END");
    }
}
