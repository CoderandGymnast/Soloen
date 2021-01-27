import { MAX_LENGTH_LABEL } from "src/dtos/address/address.dto";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import config from "../config"
import { Wallet } from "./wallet.entity";

export namespace Address {

    export enum Status {
        ACTIVE = "ACTIVE",
        INACTIVE = "INACTIVE"
    }

    @Entity({ name: config.database.tables.address })
    export class Model {
        @PrimaryGeneratedColumn()
        id?: number

        @Column({ nullable: true, length: MAX_LENGTH_LABEL }) /** [WARNING]: Changing rules would delete all data. */
        label?: string

        @Column({ default: "0" })
        balance?: string = "0"

        @Column({ default: Status.INACTIVE })
        status?: Address.Status = Status.INACTIVE

        @Column({ name: "private_key" })
        privateKey: string

        @Column({ name: "public_key" })
        publicKey: string

        @Column()
        base58: string

        @Column()
        hex: string

        @Column({name: "wallet_id"})
        @OneToOne(() => Wallet)
        @JoinColumn({ name: "wallet_id" })
        walletID?: number
    }
}