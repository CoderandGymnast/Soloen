import { Injectable } from "@nestjs/common";
import { CreateContractRequestDTO, CreateContractResponseDTO } from "src/dtos/contract/contract.dto";
import { AddressService } from "./address.service";
import TronWeb from "tronweb"

@Injectable()
export class ContractService {
 
    
    /** [TODO]: Set up NodeClient as the system's provider & use IoC container to initiate instead of doing manually. */
    nodeClients: TronWeb

    constructor(
        private readonly addressService: AddressService
    ) { }

    async create(request: CreateContractRequestDTO): Promise<void>{
        const privateKey = await this.addressService.getPrivateKey(request.ownerAddress)
        const params = [
            request.toAddress,
            parseInt(request.amount),
            request.ownerAddress,
            { permissionId: 2 }
        ]
        const unsignedContract = await this.nodeClients.transactionBuilder.sendTrx(...params)
        const signedContract = await this.nodeClients.trx.sign(unsignedContract, privateKey)
        const response = await this.nodeClients.trx.broadcast(signedContract)
    
        if(!response.result) throw Error(`[TRANSFER ERROR]: Could not transfer from '${request.ownerAddress}' to '${request.toAddress}'`)
    }

    initNodeClients(nodeClients) {
        this.nodeClients = nodeClients
        console.log("[CONTRACT SERVICE]: Node clients are initiated, Contract service is ready")
    }
}