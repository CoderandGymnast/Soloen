import { BadRequestException, Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Connection } from 'typeorm';
import { WalletService } from '../services/wallet.service';
import { CreateWalletRequestDTO, CreateWalletResponseDTO, MAX_LENGTH_LABEL } from "../dtos/wallet/wallet.dto"

@Controller({ path: "wallet" })
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
    private readonly connection: Connection
  ) { }

  @Post("/create")
  async create(@Body() request: CreateWalletRequestDTO): Promise<CreateWalletResponseDTO> {

    if (request.label.length >= MAX_LENGTH_LABEL) throw new BadRequestException(`MAX LENGTH LABEL: ${MAX_LENGTH_LABEL}`)

    return await this.walletService.create({ ...request })
  }
}
