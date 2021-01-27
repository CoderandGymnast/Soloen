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

        if(ownerAddress == toAddress) throw new BadRequestException(ownerAddress+" COULD NOT TRANSFER TO THE SAME ACCOUNT "+toAddress)
        const existStatus = await this.addressService.doesExist(ownerAddress)
        if (!existStatus) throw new BadRequestException(`ADDRESS '${ownerAddress}' DOES NOT EXIST`)
        const validationStatus = await this.addressService.isValid(toAddress)
        /** [NOTES]: Should check address format. */
        // if(!validationStatus) throw new BadRequestException(`ADDRESS '${ownerAddress}' IS INVALID`)
        
        const contract = await this.contractService.create(request)
        const response: CreateContractResponseDTO = {
            id: contract.txid,
            status: Contract.Status.PENDING
        }

        return response
    }
}
