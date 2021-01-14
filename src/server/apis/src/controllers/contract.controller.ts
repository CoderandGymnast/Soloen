import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { NodeClient } from "src/blockchain/nodeclient.blockchain";
import { CreateContractRequestDTO, CreateContractResponseDTO } from "src/dtos/contract/contract.dto";
import { AddressService } from "../services/address.service";

@Controller({ path: "contract" })
export class ContractController {
    
    /** [TODO]: Set up NodeClient as the system's provider & use IoC container to initiate instead of doing manually. */
    private readonly nodeClient: NodeClient

    constructor(
        private readonly addressService: AddressService,
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
