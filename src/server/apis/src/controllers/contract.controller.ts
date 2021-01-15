import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { NodeClient } from "src/blockchain/nodeclient.blockchain";
import { CreateContractRequestDTO, CreateContractResponseDTO } from "src/dtos/contract/contract.dto";
import { ContractService } from "src/services/contract.service";
import { AddressService } from "../services/address.service";

@Controller({ path: "contract" })
export class ContractController {

    constructor(
        private readonly addressService: AddressService,
        private readonly contractService: ContractService
    ) { }

    @Post("/create")
    async create(@Body() request: CreateContractRequestDTO): Promise<CreateContractResponseDTO> {

        const ownerAddress = request.ownerAddress
        const toAddress = request.toAddress

        const existStatus = await this.addressService.doesExist(ownerAddress)
        if (!existStatus) throw new BadRequestException(`ADDRESS '${ownerAddress}' DOES NOT EXIST`)
        const validationStatus = await this.addressService.isValid(toAddress)
        /** [NOTES]: Should check address format. */
        // if(!validationStatus) throw new BadRequestException(`ADDRESS '${ownerAddress}' IS INVALID`)


        return
    }
}
