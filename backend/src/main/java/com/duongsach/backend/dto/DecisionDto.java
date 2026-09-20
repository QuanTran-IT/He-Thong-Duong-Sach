package com.duongsach.backend.dto;

public class DecisionDto {
    private String decision; 
    private String note;

    public DecisionDto() {}

    public DecisionDto(String decision, String note) {
        this.decision = decision;
        this.note = note;
    }

    public String getDecision() {
        return decision;
    }

    public void setDecision(String decision) {
        this.decision = decision;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
