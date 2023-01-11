import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class SYS_Users extends BaseEntity {

    @PrimaryGeneratedColumn()
    USR_Id: string;

    @Column()
    USR_Name: string

    @Column()
    USR_Password: string



}