package com.duongsach.backend.service;

import com.duongsach.backend.dto.DecisionDto;
import com.duongsach.backend.dto.ProposalDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminProposalService {

    private final List<ProposalDto> proposals = new ArrayList<>();

    public AdminProposalService() {
        proposals.add(new ProposalDto("SK-026", "Thành phố kể chuyện", "NXB Kim Đồng", "10/09/2026", "pending", ""));
        proposals.add(new ProposalDto("SK-027", "Hội sách mùa thu", "NXB Trẻ", "12/09/2026", "approved", "Đã duyệt, chuẩn bị sân khấu"));
        proposals.add(new ProposalDto("SK-028", "Giao lưu tác giả", "Nhã Nam", "13/09/2026", "rejected", "Không phù hợp tiêu chí"));
    }

    public List<ProposalDto> getProposals(String status, String date) {
        return proposals.stream()
                .filter(p -> status == null || status.isEmpty() || p.getStatus().equalsIgnoreCase(status))
                .filter(p -> date == null || date.isEmpty() || p.getSubmittedAt().equals(date))
                .collect(Collectors.toList());
    }

    public Optional<ProposalDto> getProposalById(String id) {
        return proposals.stream().filter(p -> p.getId().equals(id)).findFirst();
    }

    public ProposalDto changeStatus(String id, String newStatus, String note) {
        Optional<ProposalDto> optionalProposal = getProposalById(id);
        if (optionalProposal.isPresent()) {
            ProposalDto proposal = optionalProposal.get();
            proposal.setStatus(newStatus);
            if (note != null) {
                proposal.setNote(note);
            }
            return proposal;
        }
        return null; // or throw Exception
    }
}
