import { BadRequestException, Body, Controller, Post,Get,Param } from "@nestjs/common"
import { CreateAddressRequestDTO, CreateAddressResponseDTO, MAX_LENGTH_LABEL} from "src/dtos/address/address.dto"
import { AddressService } from "src/services/address.service"
import { WalletService } from "src/services/wallet.service"

@Controller({ path: "address" })
export class AddressController {
    constructor(
        private readonly addressService: AddressService,
        private readonly walletService: WalletService,
    ) { }

    @Post("/create")
    async create(@Body() requestBody: CreateAddressRequestDTO): Promise<CreateAddressResponseDTO> {

        if (!(await this.walletService.find(requestBody.walletID)).length) throw new BadRequestException(`WALLET ID: '${requestBody.walletID}' DOES NOT EXIST`)
        if (!requestBody.walletID) throw new BadRequestException("MISSING WALLET ID")
        if (requestBody.label)
            if (requestBody.label.length >= MAX_LENGTH_LABEL) throw new BadRequestException(`MAX LENGTH LABEL: '${MAX_LENGTH_LABEL}'`)

        return await this.addressService.create(requestBody)
    }
    @Get(':base58Address/balance')
    async get_balance(@Param('base58Address') base58Address: string){
        return await this.addressService.getBalance(base58Address)
    }
}
