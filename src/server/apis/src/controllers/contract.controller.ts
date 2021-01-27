import { BadRequestException, Body, Controller, Post, UseGuards } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { NodeClient } from "src/blockchain/nodeclient.blockchain";
import { CreateContractRequestDTO, CreateContractResponseDTO } from "src/dtos/contract/contract.dto";
import { Contract } from "src/entities/contract.entity";
import { ContractService } from "src/services/contract.service";
import { Repository } from "typeorm";
import { AddressService } from "../services/address.service";

@Controller({ path: "contract" })
export class ContractController {

    constructor(
        @InjectRepository(Contract.Contract_Model)
        private contractRepository:Repository<Contract.Contract_Model>,
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

        // tạo 1 contract ct của soloen
        //
        const contract = await this.contractService.create(request)
        //function update contract table
        const response: CreateContractResponseDTO = {
            id: contract.txid,//chính là hash của contract
            status: Contract.Status.PENDING
        }

        return response
    }
}
