import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Event {
    @PrimaryColumn()
    eventId!: string;

    @Column({ nullable: true })
    proposalId!: string;

    @Column()
    title!: string;

    @Column({ type: "date", nullable: true })
    eventDate!: Date;

    @Column({ nullable: true })
    dayOfWeek!: string;

    @Column({ type: "time", nullable: true })
    timeStart!: string;

    @Column({ type: "time", nullable: true })
    timeEnd!: string;

    @Column({ nullable: true })
    place!: string;

    @Column({ nullable: true })
    partnerName!: string;

    @Column({ nullable: true })
    type!: string;

    @Column({ nullable: true })
    priority!: string;

    @Column({ type: "text", nullable: true })
    description!: string;

    @Column({ nullable: true })
    colorTag!: string;

    @Column({ default: false })
    isPublished!: boolean;

    @CreateDateColumn()
    createdAt!: Date;
}
