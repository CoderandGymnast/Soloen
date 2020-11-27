import { MAX_LENGTH_LABEL } from "src/dtos/wallet/wallet.dto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import config from "../config"

@Entity({ name: config.database.tables.wallet })
export class Wallet{
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ nullable: true, length: MAX_LENGTH_LABEL }) /** [WARNING]: Changing rules would delete all data. */
    label?: string
}