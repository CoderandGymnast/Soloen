import { Module } from '@nestjs/common';
import { WalletController } from './controllers/wallet.controller';
import { WalletService } from './services/wallet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from "./config"
import { Wallet } from './entities/wallet.entity';
import { AddressController } from './controllers/address.controller';
import { AddressService } from './services/address.service';
import { Address } from './entities/address.entity';
import { Synchronizer } from './worker/synchronizer.worker';
import {EventEmitter} from "events"
import { ContractController } from "./controllers/contract.controller"
import { ContractService } from './services/contract.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import {AppController} from './app.controller'
import { UserEntity } from './entities/users.entity';
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
      entities: [Wallet, Address.Model, Synchronizer.Progress,UserEntity.UserModel],
      synchronize: true,
      logging: false
    }),
    TypeOrmModule.forFeature([Wallet, Address.Model,UserEntity.UserModel]),
    AuthModule,
    UsersModule,
  ],
  controllers: [WalletController, AddressController, ContractController,AppController],
  providers: [WalletService, AddressService, EventEmitter, ContractService],
})
export class AppModule {}