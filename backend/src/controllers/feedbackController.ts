import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Feedback } from "../entity/Feedback";

export const getFeedbacks = async (req: Request, res: Response): Promise<void> => {
    try {
        const feedbackRepo = AppDataSource.getRepository(Feedback);
        const feedbacks = await feedbackRepo.find({ order: { createdAt: "DESC" } });
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateFeedbackStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id as string;
        const { status } = req.body;
        const feedbackRepo = AppDataSource.getRepository(Feedback);
        
        let feedback = await feedbackRepo.findOneBy({ id });
        if (!feedback) {
            res.status(404).json({ message: "Feedback not found" });
            return;
        }

        feedback.status = status;
        await feedbackRepo.save(feedback);
        res.json(feedback);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
