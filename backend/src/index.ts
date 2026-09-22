import "reflect-metadata";
import express, { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import * as dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import cors from "cors";

// Import routes
import proposalRoutes from "./routes/proposalRoutes";
import eventRoutes from "./routes/eventRoutes";
import stallRoutes from "./routes/stallRoutes";
import feedbackRoutes from "./routes/feedbackRoutes";
import logRoutes from "./routes/logRoutes";

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
    apis: ["./src/routes/*.ts"] // Updated to read annotations from routes
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req: Request, res: Response) => {
    res.send("Backend is running with Node.js and TypeORM! Visit /api-docs for Swagger UI.");
});

// API Routes
app.use("/api/admin/proposals", proposalRoutes);
app.use("/api/admin/events", eventRoutes);
app.use("/api/admin/stalls", stallRoutes);
app.use("/api/admin/feedbacks", feedbackRoutes);
app.use("/api/admin/logs", logRoutes);

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
