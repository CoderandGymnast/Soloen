import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {UserEntity} from '../entities/users.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from '../entities/address.entity';
import { Wallet } from 'src/entities/wallet.entity';
import { AddressService } from 'src/services/address.service';
import { WalletService } from 'src/services/wallet.service';
import { ContractService } from 'src/services/contract.service';
import {EventEmitter} from "events"
@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntity.UserModel,Address.Model,Wallet])
  ],
  providers: [UsersService,AddressService,WalletService,ContractService,EventEmitter],
  exports: [UsersService,AddressService,WalletService,ContractService,EventEmitter],
})
export class UsersModule {}
