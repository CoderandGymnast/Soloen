import { Contract } from "src/entities/contract.entity"

class CreateContractRequestDTO {
    ownerAddress: string
    toAddress: string
    amount: string
}

class CreateContractResponseDTO {
    id: string
    status: Contract.Status
}
class UpdateContractRequestDTO{
            // hash: string
            // owner_address:string
            // to_address:string
            // amount:string
            // status:string
}
class UpdateContractResponseDTO{
    
}

export { CreateContractRequestDTO, CreateContractResponseDTO,UpdateContractRequestDTO,UpdateContractResponseDTO }