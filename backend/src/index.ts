import "reflect-metadata";
import express, { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import * as dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import cors from "cors";
import { Proposal } from "./entity/Proposal";
import { Event } from "./entity/Event";
import { Stall } from "./entity/Stall";
import { Feedback } from "./entity/Feedback";
import { SystemLog } from "./entity/SystemLog";
import { Like } from "typeorm";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// --- Swagger Configuration ---
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Admin Management API",
            version: "1.0.0",
            description: "API cho trang quản lý Đường Sách (Hồ sơ, Sự kiện)"
        },
        servers: [
            {
                url: `http://localhost:${PORT}`
            }
        ]
    },
    apis: ["./src/index.ts"]
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req: Request, res: Response) => {
    res.send("Backend is running with Node.js and TypeORM! Visit /api-docs for Swagger UI.");
});

// ==========================================
// PROPOSALS API
// ==========================================

/**
 * @openapi
 * /api/admin/proposals:
 *   get:
 *     summary: Lấy danh sách hồ sơ đề xuất
 *     description: Lấy danh sách toàn bộ hồ sơ, hỗ trợ lọc theo trạng thái và ngày.
 *     tags: [Proposals]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Trạng thái hồ sơ (VD pending, approved, rejected)
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *         description: Ngày diễn ra
 *     responses:
 *       200:
 *         description: Thành công
 */
app.get("/api/admin/proposals", async (req: Request, res: Response) => {
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
});

/**
 * @openapi
 * /api/admin/proposals/{id}:
 *   get:
 *     summary: Xem chi tiết hồ sơ
 *     tags: [Proposals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 *       404:
 *         description: Không tìm thấy hồ sơ
 */
app.get("/api/admin/proposals/:id", async (req: Request, res: Response): Promise<any> => {
    try {
        const id = req.params.id as string;
        const proposalRepo = AppDataSource.getRepository(Proposal);
        
        const proposal = await proposalRepo.findOneBy({ id });
        if (!proposal) return res.status(404).json({ message: "Proposal not found" });
        
        res.json(proposal);
    } catch (error) {
        console.error("Error fetching proposal details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * @openapi
 * /api/admin/proposals/{id}/{action}:
 *   post:
 *     summary: Duyệt hoặc thay đổi trạng thái hồ sơ
 *     description: Đổi trạng thái hồ sơ. Nếu là request-supplement hoặc reject thì body bắt buộc phải có thuộc tính `note`.
 *     tags: [Proposals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: action
 *         required: true
 *         schema:
 *           type: string
 *           enum: [approve, request-supplement, reject]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               note:
 *                 type: string
 *                 description: Ghi chú hoặc lý do (bắt buộc khi trả bổ sung hoặc từ chối)
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Thiếu note hoặc action không hợp lệ
 *       404:
 *         description: Không tìm thấy hồ sơ
 */
app.post("/api/admin/proposals/:id/:action", async (req: Request, res: Response): Promise<any> => {
    try {
        const id = req.params.id as string;
        const action = req.params.action as string;
        const { note } = req.body;
        
        const validActions = ["approve", "request-supplement", "reject"];
        if (!validActions.includes(action)) {
            return res.status(400).json({ message: "Invalid action" });
        }

        if ((action === "request-supplement" || action === "reject") && (!note || note.trim() === "")) {
            return res.status(400).json({ message: "Ghi chú (note) là bắt buộc khi trả bổ sung hoặc từ chối." });
        }

        const proposalRepo = AppDataSource.getRepository(Proposal);
        const proposal = await proposalRepo.findOneBy({ id });
        
        if (!proposal) {
            return res.status(404).json({ message: "Proposal not found" });
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
});


// ==========================================
// EVENTS API
// ==========================================

/**
 * @openapi
 * /api/admin/events:
 *   get:
 *     summary: Lấy danh sách sự kiện
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Thành công
 */
app.get("/api/admin/events", async (req: Request, res: Response) => {
    try {
        const eventRepo = AppDataSource.getRepository(Event);
        const events = await eventRepo.find({ order: { createdAt: "DESC" } });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * @openapi
 * /api/admin/events:
 *   post:
 *     summary: Tạo sự kiện mới
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventId:
 *                 type: string
 *               title:
 *                 type: string
 *               eventDate:
 *                 type: string
 *                 format: date
 *               timeStart:
 *                 type: string
 *               timeEnd:
 *                 type: string
 *               place:
 *                 type: string
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum: [Thường, Ưu tiên, Trọng điểm]
 *     responses:
 *       201:
 *         description: Tạo thành công
 */
app.post("/api/admin/events", async (req: Request, res: Response) => {
    try {
        const eventRepo = AppDataSource.getRepository(Event);
        const newEvent = eventRepo.create(req.body);
        await eventRepo.save(newEvent);
        res.status(201).json(newEvent);
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * @openapi
 * /api/admin/events/{id}:
 *   put:
 *     summary: Cập nhật sự kiện
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               eventDate:
 *                 type: string
 *                 format: date
 *               timeStart:
 *                 type: string
 *               timeEnd:
 *                 type: string
 *               place:
 *                 type: string
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum: [Thường, Ưu tiên, Trọng điểm]
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy sự kiện
 */
app.put("/api/admin/events/:id", async (req: Request, res: Response): Promise<any> => {
    try {
        const id = req.params.id as string;
        const eventRepo = AppDataSource.getRepository(Event);
        let event = await eventRepo.findOneBy({ eventId: id });
        
        if (!event) return res.status(404).json({ message: "Event not found" });

        eventRepo.merge(event, req.body);
        await eventRepo.save(event);
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * @openapi
 * /api/admin/events/{id}:
 *   delete:
 *     summary: Xóa sự kiện
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy sự kiện
 */
app.delete("/api/admin/events/:id", async (req: Request, res: Response): Promise<any> => {
    try {
        const id = req.params.id as string;
        const eventRepo = AppDataSource.getRepository(Event);
        const event = await eventRepo.findOneBy({ eventId: id });
        
        if (!event) return res.status(404).json({ message: "Event not found" });

        await eventRepo.remove(event);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// ==========================================
// STALLS API
// ==========================================

app.get("/api/admin/stalls", async (req: Request, res: Response) => {
    try {
        const stallRepo = AppDataSource.getRepository(Stall);
        const stalls = await stallRepo.find({ order: { createdAt: "DESC" } });
        res.json(stalls);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post("/api/admin/stalls", async (req: Request, res: Response): Promise<any> => {
    try {
        const stallRepo = AppDataSource.getRepository(Stall);
        const newStall = stallRepo.create(req.body);
        await stallRepo.save(newStall);
        res.status(201).json(newStall);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

app.put("/api/admin/stalls/:id", async (req: Request, res: Response): Promise<any> => {
    try {
        const id = req.params.id as string;
        const stallRepo = AppDataSource.getRepository(Stall);
        let stall = await stallRepo.findOneBy({ id });
        if (!stall) return res.status(404).json({ message: "Stall not found" });

        stallRepo.merge(stall, req.body);
        await stallRepo.save(stall);
        res.json(stall);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

app.delete("/api/admin/stalls/:id", async (req: Request, res: Response): Promise<any> => {
    try {
        const id = req.params.id as string;
        const stallRepo = AppDataSource.getRepository(Stall);
        const stall = await stallRepo.findOneBy({ id });
        if (!stall) return res.status(404).json({ message: "Stall not found" });

        await stallRepo.remove(stall);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});


// ==========================================
// FEEDBACKS API
// ==========================================

app.get("/api/admin/feedbacks", async (req: Request, res: Response) => {
    try {
        const feedbackRepo = AppDataSource.getRepository(Feedback);
        const feedbacks = await feedbackRepo.find({ order: { createdAt: "DESC" } });
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

app.put("/api/admin/feedbacks/:id/status", async (req: Request, res: Response): Promise<any> => {
    try {
        const id = req.params.id as string;
        const { status } = req.body;
        const feedbackRepo = AppDataSource.getRepository(Feedback);
        let feedback = await feedbackRepo.findOneBy({ id });
        if (!feedback) return res.status(404).json({ message: "Feedback not found" });

        feedback.status = status;
        await feedbackRepo.save(feedback);
        res.json(feedback);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});


// ==========================================
// SYSTEM LOGS API
// ==========================================

app.get("/api/admin/logs", async (req: Request, res: Response) => {
    try {
        const logRepo = AppDataSource.getRepository(SystemLog);
        const logs = await logRepo.find({ order: { createdAt: "DESC" }, take: 100 });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post("/api/admin/logs", async (req: Request, res: Response): Promise<any> => {
    try {
        const logRepo = AppDataSource.getRepository(SystemLog);
        const newLog = logRepo.create(req.body);
        await logRepo.save(newLog);
        res.status(201).json(newLog);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// Initialize database connection
AppDataSource.initialize()
    .then(() => {
        console.log("Database connection established successfully!");
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error during Data Source initialization:", error);
    });
