import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWalletResponseDTO } from 'src/dtos/wallet/wallet.dto';
import { Repository } from 'typeorm';
import { Wallet } from '../entities/wallet.entity';

@Injectable()
export class WalletService {

  constructor(
    @InjectRepository(Wallet)
    private readonly repository: Repository<Wallet>,
  ) { }

  async create(wallet: Wallet): Promise<CreateWalletResponseDTO> {
    const result = await this.repository.insert(wallet)
    return {
      id: result.raw.insertId
    }
  }

  async find(id: number) {
    return await this.repository.find({ id })
  }
}
