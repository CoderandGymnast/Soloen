import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from '../entities/address.entity';
import { Repository } from 'typeorm';
import {UserEntity} from '../entities/users.entity' 
export type User = any;
@Injectable()
export class UsersService {
        @InjectRepository(Address.Model)
        private readonly address_repository: Repository<Address.Model>
        @InjectRepository(UserEntity.UserModel)
        private readonly repository: Repository<UserEntity.UserModel>
    //= [
    //     {
    //       userId: 1,
    //       username: 'john',
    //       password: 'changeme',
    //     },
    //     {
    //       userId: 2,
    //       username: 'maria',
    //       password: 'guess',
    //     },
    //   ];
    
      async findOne(username: string): Promise<User | undefined> {
        return (await this.repository.find({username}))[0];
      }
      async findUser(username: string){
          const user = await this.repository.findOne({username})
          const user_id = user.userID
          const userName = user.username
          //const userPassword = user.password
          const wallet_id = user.walletID
          const address = await this.findAddressbyWallet(wallet_id)
          const balance = address.balance
          const publicKey = address.publicKey
          const base58 = address.base58
          const hex = address.hex
          return {
                id: user_id,
                username: userName,
                //userpassword: userPassword,
                wallet_id:wallet_id,
                balance : balance,
                publicKey: publicKey,
                base58: base58,
                hex: hex
            }
        }
        async findAddressbyUser(username: string){
            const user = await this.repository.findOne({username})
            const wallet_id = user.walletID
            const address = await this.findAddressbyWallet(wallet_id)
            const base58 = address.base58
            return {
                address: base58
            }
        }
        async findAddressbyWallet(walletID: number){
            const wallet = await this.address_repository.findOne({walletID})
            return { 
                balance : wallet.balance,
                publicKey: wallet.publicKey,
                base58: wallet.base58,
                hex: wallet.hex,
            }
        }
}
