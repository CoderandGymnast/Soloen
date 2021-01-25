import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User.User_model)
    private readonly repository: Repository<User.User_model>,
  ) { }
  async getUser(){

  }
  async login(){

  }
  async logout(){

  }

}
