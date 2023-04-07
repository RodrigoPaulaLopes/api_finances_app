import { Injectable } from "@nestjs/common";
import { Invoices } from "src/invoices/invoices.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    name: string
    @Column({ nullable: false, unique: true })
    login: string
    @Column({ nullable: false })
    password: string
    @OneToMany(() => Invoices, invoice => invoice.user)
    invoices?: Invoices[]
}