import { Module } from '@nestjs/common';
import { AppController } from './controllers/wallet.controller';
import { WalletService } from './services/wallet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from "./config"
import { Wallet } from './entities/wallet.entity';

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
      entities: [Wallet],
      synchronize: true,
      logging: false
    }),
  ],
  controllers: [AppController],
  providers: [WalletService],
})
export class AppModule {}
