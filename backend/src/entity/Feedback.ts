import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Feedback {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "nvarchar", length: 255 })
    author!: string;

    @Column({ type: "nvarchar", length: 255 })
    email!: string;

    @Column({ type: "nvarchar", length: 50 })
    date!: string;

    @Column({ type: "text" })
    content!: string;

    @Column({ type: "nvarchar", length: 50, default: "pending" })
    status!: string; // pending, acknowledged, resolved

    @CreateDateColumn()
    createdAt!: Date;
}
