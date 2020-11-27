import { Injectable } from '@nestjs/common';
import { CreateWalletResponseDTO } from 'src/dtos/wallet/wallet.dto';
import { getRepository, Repository } from 'typeorm';
import { Wallet } from '../entities/wallet.entity';

@Injectable()
export class WalletService {

  private repository: Repository<Wallet>

  connectToDB() {
    this.repository = getRepository(Wallet)
  }

  async create(wallet: Wallet): Promise<CreateWalletResponseDTO> {
    const result = await this.repository.insert(wallet)
    return {
      id: result.raw.insertId
    }
  }

  async find(id: number) {
    return await this.repository.find({id})
  }
}
