import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Stall {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "nvarchar", length: 255 })
    name!: string;

    @Column({ type: "nvarchar", length: 100 })
    type!: string;

    @Column({ type: "int", default: 0 })
    books!: number;

    @CreateDateColumn()
    createdAt!: Date;
}
