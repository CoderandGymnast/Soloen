import { Injectable } from "@nestjs/common";
import { CreateContractRequestDTO, CreateContractResponseDTO } from "src/dtos/contract/contract.dto";
import { AddressService } from "./address.service";
import TronWeb from "tronweb"
import config from "src/config";

@Injectable()
export class ContractService {

    private readonly nodeClient = new TronWeb({ fullHost: config.nodes.fullHost })

    constructor(
        private readonly addressService: AddressService
    ) { }

    async create(request: CreateContractRequestDTO): Promise<CreateContractResponseDTO>{
        const privateKey = await this.addressService.getPrivateKey(request.ownerAddress)
        const params = [
            request.toAddress,
            parseInt(request.amount),
            request.ownerAddress,
            { permissionId: 2 }
        ]
        const unsignedContract = await this.nodeClient.transactionBuilder.sendTrx(...params)
        const signedContract = await this.nodeClient.trx.sign(unsignedContract, privateKey)
        const response = await this.nodeClient.trx.broadcast(signedContract)
    
        if(!response.result) throw Error(`[TRANSFER ERROR]: Could not transfer from '${request.ownerAddress}' to '${request.toAddress}'`)

        return {

        }
    }
}