import { Injectable } from '@nestjs/common';
import { Address } from 'src/entities/address.entity';
import { Repository } from 'typeorm';
import TronWeb from "tronweb"
import { CreateAddressRequestDTO, CreateAddressResponseDTO } from 'src/dtos/address/address.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AddressService {

    constructor(
        @InjectRepository(Address.Model)
        private readonly repository: Repository<Address.Model>
    ) { }

    async create(params: CreateAddressRequestDTO): Promise<CreateAddressResponseDTO> {
        const accounts = TronWeb.utils.accounts
        const account = accounts.generateAccount()
        const address: Address.Model = {
            label: params.label,
            privateKey: account.privateKey,
            publicKey: account.publicKey,
            base58: account.address.base58,
            hex: account.address.hex,
            walletID: params.walletID
        }
        const result = await this.repository.insert(address)
        return {
            id: result.raw.insertId,
            base58Address: address.base58,
            status: address.status
        }
    }
}
