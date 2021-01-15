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
      entities: [Wallet, Address.Model, Synchronizer.Progress],
      synchronize: true,
      logging: false
    }),
    TypeOrmModule.forFeature([Wallet, Address.Model]),
  ],
  controllers: [WalletController, AddressController, ContractController],
  providers: [WalletService, AddressService, EventEmitter, ContractService],
})
export class AppModule {}