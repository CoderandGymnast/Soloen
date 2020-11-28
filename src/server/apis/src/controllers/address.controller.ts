import { BadRequestException, Body, Controller, Post } from "@nestjs/common"
import { CreateAddressRequestDTO, CreateAddressResponseDTO, MAX_LENGTH_LABEL } from "src/dtos/address/address.dto"
import { AddressService } from "src/services/address.service"
import { WalletService } from "src/services/wallet.service"

@Controller({ path: "address" })
export class AddressController {
    constructor(
        private readonly addressService: AddressService,
        private readonly walletService: WalletService,
    ) { }

    @Post("/create")
    async create(@Body() request: CreateAddressRequestDTO): Promise<CreateAddressResponseDTO> {

        if(!(await this.walletService.find(request.walletID)).length) throw new BadRequestException(`WALLET ID: '${request.walletID}' DOES NOT EXIST`)
        if(!request.walletID) throw new BadRequestException("MISSING WALLET ID")
        if(request.label.length >= MAX_LENGTH_LABEL) throw new BadRequestException(`MAX LENGTH LABEL: '${MAX_LENGTH_LABEL}'`)

        return await this.addressService.create(request)
    }
}
