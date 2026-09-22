import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Proposal } from "../entity/Proposal";
import { Like } from "typeorm";

export const getProposals = async (req: Request, res: Response): Promise<void> => {
    try {
        const status = req.query.status as string | undefined;
        const date = req.query.date as string | undefined;
        const proposalRepo = AppDataSource.getRepository(Proposal);
        
        let whereClause: any = {};
        if (status) whereClause.status = status;
        if (date) whereClause.date = Like(`%${date}%`);
        
        const proposals = await proposalRepo.find({ where: whereClause, order: { createdAt: "DESC" } });
        res.json(proposals);
    } catch (error) {
        console.error("Error fetching proposals:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getProposalById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id as string;
        const proposalRepo = AppDataSource.getRepository(Proposal);
        
        const proposal = await proposalRepo.findOneBy({ id });
        if (!proposal) {
            res.status(404).json({ message: "Proposal not found" });
            return;
        }
        
        res.json(proposal);
    } catch (error) {
        console.error("Error fetching proposal details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateProposalStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id as string;
        const action = req.params.action as string;
        const { note } = req.body;
        
        const validActions = ["approve", "request-supplement", "reject"];
        if (!validActions.includes(action)) {
            res.status(400).json({ message: "Invalid action" });
            return;
        }

        if ((action === "request-supplement" || action === "reject") && (!note || note.trim() === "")) {
            res.status(400).json({ message: "Ghi chú (note) là bắt buộc khi trả bổ sung hoặc từ chối." });
            return;
        }

        const proposalRepo = AppDataSource.getRepository(Proposal);
        const proposal = await proposalRepo.findOneBy({ id });
        
        if (!proposal) {
            res.status(404).json({ message: "Proposal not found" });
            return;
        }

        if (action === "approve") proposal.status = "approved";
        else if (action === "request-supplement") proposal.status = "supplement";
        else if (action === "reject") proposal.status = "rejected";

        if (note !== undefined) {
            proposal.note = note;
        }

        await proposalRepo.save(proposal);
        res.json({ message: "Status updated successfully", proposal });
    } catch (error) {
        console.error("Error updating proposal status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
