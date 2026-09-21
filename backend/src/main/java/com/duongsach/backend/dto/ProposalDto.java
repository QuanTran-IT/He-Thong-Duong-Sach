package com.duongsach.backend.dto;

public class ProposalDto {
    private String id;
    private String title;
    private String partnerName;
    private String submittedAt;
    private String status; // pending, approved, request-supplement, rejected
    private String note;
    
    public ProposalDto() {}

    public ProposalDto(String id, String title, String partnerName, String submittedAt, String status, String note) {
        this.id = id;
        this.title = title;
        this.partnerName = partnerName;
        this.submittedAt = submittedAt;
        this.status = status;
        this.note = note;
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

    public String getPartnerName() {
        return partnerName;
    }

    public void setPartnerName(String partnerName) {
        this.partnerName = partnerName;
    }

    public String getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(String submittedAt) {
        this.submittedAt = submittedAt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
