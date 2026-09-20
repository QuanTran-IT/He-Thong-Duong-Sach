package com.duongsach.backend.controller;

import com.duongsach.backend.dto.DecisionDto;
import com.duongsach.backend.dto.ProposalDto;
import com.duongsach.backend.service.AdminProposalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/admin/proposals")
public class AdminProposalController {

    private final AdminProposalService proposalService;

    public AdminProposalController(AdminProposalService proposalService) {
        this.proposalService = proposalService;
    }

    @GetMapping
    public ResponseEntity<List<ProposalDto>> getProposals(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String date) {
        return ResponseEntity.ok(proposalService.getProposals(status, date));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProposalDto> getProposalById(@PathVariable String id) {
        return proposalService.getProposalById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/{decision}")
    public ResponseEntity<ProposalDto> decideProposal(
            @PathVariable String id,
            @PathVariable String decision,
            @RequestBody(required = false) DecisionDto request) {

        if (!decision.equals("approve") && !decision.equals("request-supplement") && !decision.equals("reject")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid decision action.");
        }

        String note = (request != null) ? request.getNote() : null;

        if ((decision.equals("request-supplement") || decision.equals("reject")) && (note == null || note.trim().isEmpty())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ghi chú là bắt buộc khi yêu cầu bổ sung hoặc từ chối.");
        }

        String newStatus = decision.equals("approve") ? "approved" :
                           decision.equals("request-supplement") ? "request-supplement" : "rejected";

        ProposalDto updated = proposalService.changeStatus(id, newStatus, note);
        if (updated == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy hồ sơ.");
        }

        return ResponseEntity.ok(updated);
    }
}
