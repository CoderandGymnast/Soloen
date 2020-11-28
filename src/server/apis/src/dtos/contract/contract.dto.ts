import { Contract } from "src/entities/contract.entity"

class CreateContractRequestDTO {
    ownerAddress: string
    toAddress: string
    amount: string
}

class CreateContractResponseDTO {
    id: string
    hash: string
    status: Contract.Status
}

export { CreateContractRequestDTO, CreateContractResponseDTO }