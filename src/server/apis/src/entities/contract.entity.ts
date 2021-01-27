import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import config from "../config"

export namespace Contract {

    @Entity({ name: config.database.tables.contract })
    export class ContractModel {

        @PrimaryGeneratedColumn()
        id?: number

        @Column({ nullable: true })
        hash?: string

        @Column({ name: "ownder_address" })
        ownerAddress: string

        @Column({ name: "to_address" })
        toAddress: string
    
        @Column()
        amount: string
    }

    export enum Status {
        PENDING = "PENDING",
        CONFIRM = "CONFIRM"
    }
}