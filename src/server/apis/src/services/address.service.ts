import { Injectable } from '@nestjs/common';
import { Address } from 'src/entities/address.entity';
import { Repository } from 'typeorm';
import TronWeb from "tronweb"
import { CreateAddressRequestDTO, CreateAddressResponseDTO,GetbalanceRequestDTO,GetbalanceResponseDTO   } from 'src/dtos/address/address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter } from 'events';
import { Event } from './events/events';

@Injectable()
export class AddressService {

    workAroundChannel: EventEmitter    

    constructor(
        @InjectRepository(Address.Model)
        private readonly repository: Repository<Address.Model>,
        private readonly channel: EventEmitter
    ) {
        this.channel.addListener(Event.ADDRESS, () => { })
        // this.channel.on(Event.ADDRESS, (hexAddress) => {
        //     console.log("Address is created....")
        //     console.log(hexAddress)
        // })
        this.workAroundChannel = this.channel
    }

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

        console.log("1")
        console.log(account.address.hex)
        this.emitEvent(account.address.hex)
        console.log("2")

        return {
            id: result.raw.insertId,
            base58Address: address.base58,
            status: address.status
        }
    }

    async getAll() {
        return await this.repository.find()
    }

    async updateBalance(hexAddress: string, balance: string) {
        return await this.repository.update({ hex: hexAddress }, { balance })
    }

    async getPrivateKey(base58Address: string) {
        return (await this.repository.findOne({ base58: base58Address })).privateKey
    }

    async doesExist(base58Address: string) {
        const address =  await this.repository.findOne({ base58: base58Address })
        return address ? true : false
    }

    /** [TODO]: Should use offline lib. */
    async isValid(base58Address: string) {
        try {
            await TronWeb.trx.getAccount(base58Address)
            return true
        } catch (e) {
            return false
        }
    }

    async getBalance(base58Address: string){
        return (await this.repository.findOne({ base58: base58Address })).balance
    }
    private emitEvent(hexAddress: string) {
        console.log("Long aw lskjasldaladkajla")
        this.channel.emit(Event.ADDRESS, hexAddress)
        console.log(this.channel)
    }
}
