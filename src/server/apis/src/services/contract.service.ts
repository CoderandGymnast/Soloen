import { Injectable } from "@nestjs/common";
import { CreateContractRequestDTO, CreateContractResponseDTO, UpdateContractRequestDTO, UpdateContractResponseDTO } from "src/dtos/contract/contract.dto";
import { AddressService } from "./address.service";
import TronWeb from "tronweb"
import { Contract } from "src/entities/contract.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ContractService {
 
    
    /** [TODO]: Set up NodeClient as the system's provider & use IoC container to initiate instead of doing manually. */
    nodeClients: TronWeb

    constructor(
        @InjectRepository(Contract.ContractModel)
        private readonly repository: Repository<Contract.ContractModel>,
        private readonly addressService: AddressService
    ) { }

    async create(request: CreateContractRequestDTO) {
        const privateKey = await this.addressService.getPrivateKey(request.ownerAddress)
        const params = [
            request.toAddress,
            parseInt(request.amount),
            request.ownerAddress,
            { permissionId: 2 }
        ]

        /** 
         * [NOTES]:
         * "[ExceptionsHandler] Cannot transfer TRX to the same account"
         */
        const unsignedContract = await this.nodeClients.transactionBuilder.sendTrx(...params)
        const signedContract = await this.nodeClients.trx.sign(unsignedContract, privateKey)
        const response = await this.nodeClients.trx.broadcast(signedContract)
    
        if(!response.result) throw Error(`[TRANSFER ERROR]: Could not transfer from '${request.ownerAddress}' to '${request.toAddress}'`)
        
        return response
    }
    async updateContractTable(params:UpdateContractRequestDTO):Promise<UpdateContractResponseDTO>{
        await this.repository.insert(params)
        return{
            message :'Make contract'
        } 
    }
    async getAll(){
        return await this.repository.find()
    }
    initNodeClients(nodeClients) {
        this.nodeClients = nodeClients
        console.log("[CONTRACT SERVICE]: Node clients are initiated, Contract service is ready")
    }
}

/**
 * [ERROR]: 
 * 1. "[ExceptionsHandler] class org.tron.core.exception.ContractValidateException : Validate TransferContract error, no OwnerAccount.": 
 * Reason: Owner account does not exist on the Tron Blockchain.
 * Solution: Send TRXs to the owner account.
 */