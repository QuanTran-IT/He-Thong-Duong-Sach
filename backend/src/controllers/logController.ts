import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { SystemLog } from "../entity/SystemLog";

export const getLogs = async (req: Request, res: Response): Promise<void> => {
    try {
        const logRepo = AppDataSource.getRepository(SystemLog);
        const logs = await logRepo.find({ order: { createdAt: "DESC" }, take: 100 });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createLog = async (req: Request, res: Response): Promise<void> => {
    try {
        const logRepo = AppDataSource.getRepository(SystemLog);
        const newLog = logRepo.create(req.body);
        await logRepo.save(newLog);
        res.status(201).json(newLog);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
