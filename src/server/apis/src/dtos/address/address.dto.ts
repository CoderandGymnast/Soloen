import { Address } from "src/entities/address.entity"

const MAX_LENGTH_LABEL = 255

class CreateAddressRequestDTO {
    walletID: number
    label?: string
} 

class CreateAddressResponseDTO {
    id: string
    base58Address: string
    status: Address.Status
}

class GetbalanceRequestDTO {
    base58Address: string
}
class GetbalanceResponseDTO {
    balance: string
}
export { CreateAddressRequestDTO, CreateAddressResponseDTO, MAX_LENGTH_LABEL,GetbalanceRequestDTO,GetbalanceResponseDTO }