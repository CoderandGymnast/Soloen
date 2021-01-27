import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserRequestDTO, CreateUserResponseDTO} from "src/dtos/users/users.dto"
import { CreateWalletResponseDTO } from 'src/dtos/wallet/wallet.dto';
import { Address } from '../entities/address.entity';
import { Repository } from 'typeorm';
import {UserEntity} from '../entities/users.entity' 
import { Wallet } from 'src/entities/wallet.entity';
import { WalletService } from 'src/services/wallet.service';
import { AddressService } from 'src/services/address.service';
export type User = any;
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Address.Model)
        private readonly address_repository: Repository<Address.Model>,
        @InjectRepository(UserEntity.UserModel)
        private readonly repository: Repository<UserEntity.UserModel>,
        @InjectRepository(Wallet) 
        private readonly wallet_repository: Repository<Wallet>,
        private walletService: WalletService,
        private addressService: AddressService
    ){}
        
       async createUser(params: CreateUserRequestDTO): Promise<CreateUserResponseDTO>{
           console.log (params)
        const user = await this.repository.findOne({username: params.username})
        if(user){
            console.log('The email has already been taken')
            throw new BadRequestException("The email has already been taken")
        }
            else{
                const label = params.username+'wallet'
                const newWallet = await this.walletService.create({'label':label})
                //const newWallet = await this.wallet_repository.insert({'label':label})
                const user: UserEntity.UserModel = {
                    username: params.username,
                    password: params.password,
                    walletID:newWallet.id
                }   
                await this.repository.insert(user)
                await this.addressService.create({walletID:user.walletID,label: params.username+'wallet'})
                //const newAddress = await this.address_repository.create()
                console.log('Create User Successfully')
                return { 
                    message: 'Create User Successfully',
                    user:{
                        username: params.username,
                        //walletID: params.walletID     
                    }
                }
            }
       }
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
        async findUserbyWallet(walletID: number){
            const user = await this.repository.findOne({walletID})
            if(!user){
                return
            }else{
                return {
                    user:user.username,
                    walletID:user.walletID
                }
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
