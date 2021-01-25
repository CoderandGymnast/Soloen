import { MAX_LENGTH_LABEL } from "src/dtos/address/address.dto";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,OneToOne} from "typeorm";
import config from "../config"
import { Wallet } from "./wallet.entity";

export namespace User {
  
    @Entity({ name: config.database.tables.user})
    export class User_model {
        @PrimaryGeneratedColumn()
        id_user?: number
        @Column({name: "user_email"})
        userEmail: string

        @Column({name: "user_password"})
        userPassword: string

        @OneToOne(() => Wallet)
        @JoinColumn({ name: "wallet_id" })
        walletID: number
    }
}