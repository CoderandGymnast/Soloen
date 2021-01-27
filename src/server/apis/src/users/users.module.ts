import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {UserEntity} from '../entities/users.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from '../entities/address.entity';
@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntity.UserModel,Address.Model])
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
