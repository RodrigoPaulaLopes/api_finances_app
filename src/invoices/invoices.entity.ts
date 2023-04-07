import { UsersEntity } from "src/users/users.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Invoices {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ nullable: false })
    title: string

    @Column({ nullable: false })
    value: number

    @Column({ nullable: false })
    due_date: Date

    @Column({ nullable: true })
    payment_date: Date

    @Column({ nullable: false })
    status: string

    @ManyToOne(() => UsersEntity, user => user.invoices)
    user?: UsersEntity;
}