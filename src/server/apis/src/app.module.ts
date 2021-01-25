import { Module } from '@nestjs/common';
import { WalletController } from './controllers/wallet.controller';
import { WalletService } from './services/wallet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from "./config"
import { Wallet } from './entities/wallet.entity';
import { AddressController } from './controllers/address.controller';
import { AddressService } from './services/address.service';
import { Address } from './entities/address.entity';
import { User } from './entities/user.entity';
import { Synchronizer } from './worker/synchronizer.worker';
import {EventEmitter} from "events"
import { ContractController } from "./controllers/contract.controller"
import { UserController } from "./controllers/user.controller"
import { ContractService } from './services/contract.service';
import { UserService } from './services/user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      /** @ts-ignore */
      type: config.database.type,
      host: config.database.host,
      port: config.database.port,
      username: config.database.username,
      password: config.database.password,
      database: config.database.name,
      entities: [User.Model,Wallet, Address.Model, Synchronizer.Progress],
      synchronize: true,
      logging: false
    }),
    TypeOrmModule.forFeature([Wallet, Address.Model,User.Model]),
  ],
  controllers: [WalletController, AddressController, ContractController,UserController ],
  providers: [WalletService, AddressService, EventEmitter, ContractService,UserService],
})
export class AppModule {}