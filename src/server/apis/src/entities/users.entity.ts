import { User } from "src/users/users.service";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import config from "../config"
import { Wallet } from "./wallet.entity";

export namespace UserEntity {

    @Entity({ name: config.database.tables.user})
    export class UserModel {
        @PrimaryGeneratedColumn({ name: "id_user" })
        userID?: number

        @Column({ name: "user_email" })
        username: string

        @Column({ name: "user_password" })
        password: string
        
        @Column({name: "wallet_id"})
        @OneToOne(() => Wallet)
        @JoinColumn({ name: "wallet_id" })
        walletID?: number
    }
}