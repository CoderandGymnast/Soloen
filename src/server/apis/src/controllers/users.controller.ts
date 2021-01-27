import { BadRequestException, Body, Controller, Post,Get,Param } from "@nestjs/common"
import { CreateUserRequestDTO, CreateUserResponseDTO} from "src/dtos/users/users.dto"
import { AddressService } from "src/services/address.service"
import { WalletService } from "src/services/wallet.service"
import { UsersService } from "src/users/users.service"

@Controller({ path: "user" })
export class UserController {
    constructor(
        private readonly walletService: WalletService,
        private readonly usersService:  UsersService,
    ) { }

    @Post("/create")
    async create(@Body() requestBody: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
        //console.log(requestBody)
        // if (!requestBody.walletID) throw new BadRequestException("MISSING WALLET ID")
        // if (!(await this.walletService.find(requestBody.walletID)).length) throw new BadRequestException(`WALLET ID: '${requestBody.walletID}' DOES NOT EXIST`)
        // if ((await this.usersService.findUserbyWallet(requestBody.walletID))) throw new BadRequestException(`THE WALLET : '${requestBody.walletID}' HAS ALREADY BEEN TAKEN`)
        // if (requestBody.label)
        //     if (requestBody.label.length >= MAX_LENGTH_LABEL) throw new BadRequestException(`MAX LENGTH LABEL: '${MAX_LENGTH_LABEL}'`)
        return await this.usersService.createUser(requestBody)
    }
}
