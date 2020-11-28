import { Body, Controller, Post } from "@nestjs/common";
import { CreateAddressRequestDTO, CreateAddressResponseDTO, MAX_LENGTH_LABEL } from "src/dtos/address/address.dto"
import { CreateContractRequestDTO, CreateContractResponseDTO } from "src/dtos/contract/contract.dto";

@Controller({ path: "contract" })
export class AddressController {
    constructor(
    ) { }

    @Post("/create")
    async create(@Body() request: CreateContractRequestDTO): Promise<CreateContractResponseDTO> {
        return
    }
}
