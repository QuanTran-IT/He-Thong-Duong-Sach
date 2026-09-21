import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class SystemLog {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "nvarchar", length: 50 })
    time!: string;

    @Column({ type: "nvarchar", length: 255 })
    action!: string;

    @Column({ type: "nvarchar", length: 255 })
    user!: string;

    @Column({ type: "text" })
    detail!: string;

    @Column({ type: "nvarchar", length: 50 })
    type!: string; // warning, info, success, primary, etc.

    @CreateDateColumn()
    createdAt!: Date;
}
