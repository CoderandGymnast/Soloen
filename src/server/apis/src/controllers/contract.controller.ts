import { BadRequestException, Body, Controller, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { NodeClient } from "src/blockchain/nodeclient.blockchain";
import { CreateContractRequestDTO, CreateContractResponseDTO } from "src/dtos/contract/contract.dto";
import { Contract } from "src/entities/contract.entity";
import { ContractService } from "src/services/contract.service";
import { AddressService } from "../services/address.service";

@Controller({ path: "contract" })
export class ContractController {

    constructor(
        private readonly addressService: AddressService,
        private readonly contractService: ContractService
    ) { }
    @UseGuards(JwtAuthGuard)
    @Post("/create")
    async create(@Body() request: CreateContractRequestDTO): Promise<CreateContractResponseDTO> {

        const ownerAddress = request.ownerAddress
        const toAddress = request.toAddress

        if(ownerAddress == toAddress) {
            console.log('[ERROR]:COULD NOT TRANSFER TO THE SAME ACCOUNT')
            throw new BadRequestException(" COULD NOT TRANSFER TO THE SAME ACCOUNT ")
        }
        const existStatus = await this.addressService.doesExist(ownerAddress)
        if (!existStatus) throw new BadRequestException(`ADDRESS '${ownerAddress}' DOES NOT EXIST`)
        const validationStatus = await this.addressService.isValid(toAddress)
        /** [NOTES]: Should check address format. */
        // if(!validationStatus) throw new BadRequestException(`ADDRESS '${ownerAddress}' IS INVALID`)
        
        const contract = await this.contractService.create(request)
        console.log(contract)
        const contractInfo ={ 
            hash:contract.txid,
            ownerAddress:request.ownerAddress,
            toAddress:request.toAddress,
            amount:request.amount,
            timestamp:contract.transaction.raw_data.timestamp,
            status:Contract.Status.PENDING
        }
        console.log(contractInfo)
        const update_contract_dto = await this.contractService.updateContractTable(contractInfo)
        const response: CreateContractResponseDTO = {
            id: contract.txid,
            status: Contract.Status.PENDING
        }

        return response
    }
}
