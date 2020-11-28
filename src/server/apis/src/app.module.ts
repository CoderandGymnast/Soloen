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
  ],
  controllers: [WalletController, AddressController],
  providers: [WalletService, AddressService],
})
export class AppModule {}
