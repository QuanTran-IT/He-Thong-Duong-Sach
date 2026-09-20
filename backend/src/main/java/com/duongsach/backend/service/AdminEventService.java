package com.duongsach.backend.service;

import com.duongsach.backend.dto.EventDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AdminEventService {

    private final List<EventDto> events = new ArrayList<>();

    public AdminEventService() {
        // Mock data
        events.add(new EventDto("EVT-001", "Thành phố kể chuyện", "17/09/2026 14:30", "Sân khấu trung tâm", "Sự kiện kể chuyện về lịch sử thành phố", "Trọng điểm"));
        events.add(new EventDto("EVT-002", "Đọc sách cùng bé", "15/09/2026 09:00", "Khu đọc thiếu nhi", "Hoạt động đọc sách dành cho các bé mầm non", "Thường"));
    }

    public List<EventDto> getAllEvents() {
        return events;
    }

    public Optional<EventDto> getEventById(String id) {
        return events.stream().filter(e -> e.getId().equals(id)).findFirst();
    }

    public EventDto createEvent(EventDto dto) {
        dto.setId("EVT-" + UUID.randomUUID().toString().substring(0, 8));
        events.add(dto);
        return dto;
    }

    public Optional<EventDto> updateEvent(String id, EventDto dto) {
        for (int i = 0; i < events.size(); i++) {
            if (events.get(i).getId().equals(id)) {
                dto.setId(id);
                events.set(i, dto);
                return Optional.of(dto);
            }
        }
        return Optional.empty();
    }

    public boolean deleteEvent(String id) {
        return events.removeIf(e -> e.getId().equals(id));
    }
}
