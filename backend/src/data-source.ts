import "reflect-metadata";
import { DataSource } from "typeorm";
import { Event } from "./entity/Event";
import { Proposal } from "./entity/Proposal";
import { Stall } from "./entity/Stall";
import { Feedback } from "./entity/Feedback";
import { SystemLog } from "./entity/SystemLog";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mssql",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "1433"),
    username: process.env.DB_USERNAME || "sa",
    password: process.env.DB_PASSWORD || "12345",
    database: process.env.DB_DATABASE || "DuongSach",
    synchronize: true, // synchronize schema (similar to spring.jpa.hibernate.ddl-auto=update/create-drop)
    logging: true,     // similar to spring.jpa.show-sql=true
    entities: [Event, Proposal, Stall, Feedback, SystemLog],
    subscribers: [],
    migrations: [],
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // for local dev
    }
});
