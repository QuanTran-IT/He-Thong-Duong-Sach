import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Stall } from "../entity/Stall";

export const getStalls = async (req: Request, res: Response): Promise<void> => {
    try {
        const stallRepo = AppDataSource.getRepository(Stall);
        const stalls = await stallRepo.find({ order: { createdAt: "DESC" } });
        res.json(stalls);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createStall = async (req: Request, res: Response): Promise<void> => {
    try {
        const stallRepo = AppDataSource.getRepository(Stall);
        const newStall = stallRepo.create(req.body);
        await stallRepo.save(newStall);
        res.status(201).json(newStall);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateStall = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id as string;
        const stallRepo = AppDataSource.getRepository(Stall);
        let stall = await stallRepo.findOneBy({ id });
        
        if (!stall) {
            res.status(404).json({ message: "Stall not found" });
            return;
        }

        stallRepo.merge(stall, req.body);
        await stallRepo.save(stall);
        res.json(stall);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteStall = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id as string;
        const stallRepo = AppDataSource.getRepository(Stall);
        const stall = await stallRepo.findOneBy({ id });
        
        if (!stall) {
            res.status(404).json({ message: "Stall not found" });
            return;
        }

        await stallRepo.remove(stall);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
