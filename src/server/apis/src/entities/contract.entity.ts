import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import config from "../config"

export namespace Contract {

    export enum Status {
        PENDING = "PENDING",
        CONFIRM = "CONFIRM"
    }
    @Entity({ name: config.database.tables.contract })
    export class Contract_Model {

        @PrimaryGeneratedColumn()
        id?: number

        @Column({ nullable: true })
        hash?: string

        @Column({ name: "ownder_address" })
        ownerAddress: string

        @Column({ name: "to_address" })
        toAddress: string

        @Column({ default: Status.PENDING })
        status?: Contract.Status = Status.CONFIRM

        @Column()
        amount: string
    }


}