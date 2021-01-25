import { BadRequestException, Body, Controller, Post,Get,Param } from "@nestjs/common"
import { UserService } from "src/services/user.service"
import { WalletService } from "src/services/wallet.service"

@Controller({ path: "address" })
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly walletService: WalletService,
    ) { }

    @Post("/create")
    async create()  {
       
    }
    @Get('user/:user_id')
    async get_user_info(){

    }
}
