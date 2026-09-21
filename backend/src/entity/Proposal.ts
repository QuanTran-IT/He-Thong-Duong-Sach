import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Proposal {
    @PrimaryColumn()
    id!: string;

    @Column({ nullable: true })
    partner!: string;

    @Column()
    title!: string;

    @Column({ nullable: true })
    date!: string;

    @Column({ nullable: true })
    place!: string;

    @Column({ nullable: true })
    priority!: string;

    @Column({ default: "pending" })
    status!: string;

    @Column({ nullable: true })
    submitted!: string;

    @Column({ type: "text", nullable: true })
    summary!: string;

    @Column({ type: "simple-json", nullable: true })
    equipment!: string[];

    @Column({ type: "text", nullable: true })
    note!: string;

    @CreateDateColumn()
    createdAt!: Date;
}
