import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { CreateAddressRequestDTO, CreateAddressResponseDTO, MAX_LENGTH_LABEL } from "src/dtos/address/address.dto"
import { CreateContractRequestDTO, CreateContractResponseDTO } from "src/dtos/contract/contract.dto";
import { AddressService } from "../services/address.service";

@Controller({ path: "contract" })
export class ContractController {
    constructor(
        private readonly addressService: AddressService
    ) { }

    @Post("/create")
    async create(@Body() request: CreateContractRequestDTO): Promise<CreateContractResponseDTO> {
        const ownerAddress = request.ownerAddress

        const existStatus = await this.addressService.doesExist(ownerAddress)
        if (!existStatus) throw new BadRequestException(`ADDRESS '${ownerAddress}' DOES NOT EXIST`)
        const validationStatus = await this.addressService.isValid(ownerAddress)
        /** [NOTES]: Should check address format. */
        /* if(!validationStatus) throw new BadRequestException(`ADDRESS '${ownerAddress}' IS INVALID`) */

        return
    }
}
