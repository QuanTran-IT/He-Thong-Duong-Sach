package com.duongsach.backend.dto;

public class EventDto {
    private String id;
    private String title;
    private String time;
    private String location;
    private String description;
    private String priority; // Thường, Ưu tiên, Trọng điểm

    public EventDto() {}

    public EventDto(String id, String title, String time, String location, String description, String priority) {
        this.id = id;
        this.title = title;
        this.time = time;
        this.location = location;
        this.description = description;
        this.priority = priority;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }
}
