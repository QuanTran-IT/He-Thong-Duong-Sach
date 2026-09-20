package com.duongsach.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/events")
public class EventController {
    private final List<Map<String, Object>> events = new ArrayList<>();

    public EventController() {
        events.add(event("SK-026", "Thành phố kể chuyện", "17/09/2026", "14:30", "Sân khấu trung tâm"));
        events.add(event("SK-025", "Đọc sách cùng bé", "15/09/2026", "09:00", "Khu đọc thiếu nhi"));
        events.add(event("SK-024", "Phiên chợ sách cũ", "19/09/2026", "08:00", "Khu trưng bày"));
    }

    @GetMapping
    public List<Map<String, Object>> events() {
        return events;
    }

    @PostMapping("/{id}/decision")
    public Map<String, Object> decide(@PathVariable String id, @RequestBody DecisionRequest request) {
        Map<String, Object> event = events.stream()
                .filter(item -> id.equals(item.get("id")))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy hồ sơ."));

        if (request == null || !("approved".equals(request.getDecision()) || "rejected".equals(request.getDecision()))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Quyết định không hợp lệ.");
        }
        String reason = request.getReason() == null ? "" : request.getReason().trim();
        if ("rejected".equals(request.getDecision()) && reason.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Từ chối hồ sơ cần có lý do.");
        }

        event.put("status", request.getDecision());
        event.put("reason", reason);
        return event;
    }

    private Map<String, Object> event(String id, String title, String date, String time, String location) {
        Map<String, Object> event = new LinkedHashMap<>();
        event.put("id", id);
        event.put("title", title);
        event.put("date", date);
        event.put("time", time);
        event.put("location", location);
        event.put("status", "pending");
        return event;
    }

    public static class DecisionRequest {
        private String decision;
        private String reason;

        public String getDecision() {
            return decision;
        }

        public String getReason() {
            return reason;
        }
    }
}