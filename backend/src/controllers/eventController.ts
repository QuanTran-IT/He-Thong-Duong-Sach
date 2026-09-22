import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Event } from "../entity/Event";

export const getEvents = async (req: Request, res: Response): Promise<void> => {
    try {
        const eventRepo = AppDataSource.getRepository(Event);
        const events = await eventRepo.find({ order: { createdAt: "DESC" } });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const eventRepo = AppDataSource.getRepository(Event);
        const newEvent = eventRepo.create(req.body);
        await eventRepo.save(newEvent);
        res.status(201).json(newEvent);
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id as string;
        const eventRepo = AppDataSource.getRepository(Event);
        let event = await eventRepo.findOneBy({ eventId: id });
        
        if (!event) {
            res.status(404).json({ message: "Event not found" });
            return;
        }

        eventRepo.merge(event, req.body);
        await eventRepo.save(event);
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id as string;
        const eventRepo = AppDataSource.getRepository(Event);
        const event = await eventRepo.findOneBy({ eventId: id });
        
        if (!event) {
            res.status(404).json({ message: "Event not found" });
            return;
        }

        await eventRepo.remove(event);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
