import { Injectable } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import { Wallet } from '../entities/wallet.entity';

@Injectable()
export class WalletService {

  private repository: Repository<Wallet>

  connectToDB() {
    this.repository = getRepository(Wallet)
  }

  async insert(wallet: Wallet) {
    return await this.repository.insert(wallet)
  }
}
