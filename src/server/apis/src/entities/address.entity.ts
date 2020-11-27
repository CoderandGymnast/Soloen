import { MAX_LENGTH_LABEL } from "src/dtos/address/address.dto";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import config from "../config"
import { Wallet } from "./wallet.entity";

@Entity({ name: config.database.tables.address })
export class Address{
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ nullable: true, length: MAX_LENGTH_LABEL }) /** [WARNING]: Changing rules would delete all data. */
    label?: string

    @Column()
    privateKey: string

    @Column()
    publicKey: string

    @Column()
    base58: string

    @Column()
    hex: string

    @ManyToOne(() => Wallet)
    walletID: number
}