import { Injectable } from '@nestjs/common';
import { Address } from 'src/entities/address.entity';
import { getRepository, Repository } from 'typeorm';
import TronWeb from "tronweb"
import { CreateAddressRequestDTO, CreateAddressResponseDTO } from 'src/dtos/address/address.dto';

@Injectable()
export class AddressService {

    private repository: Repository<Address>

    connectToDB() {
        this.repository = getRepository(Address)
    }

    async create(params: CreateAddressRequestDTO): Promise<CreateAddressResponseDTO> {
        const accounts = TronWeb.utils.accounts
        const account = accounts.generateAccount()
        const address: Address = {
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
            base58Address: address.base58
        }
    }
}
