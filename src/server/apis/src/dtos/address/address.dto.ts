const MAX_LENGTH_LABEL = 100

class CreateAddressRequestDTO {
    walletID: number
    label?: string
} 

class CreateAddressResponseDTO {
    id: string
    base58Address: string
}

export { CreateAddressRequestDTO, CreateAddressResponseDTO, MAX_LENGTH_LABEL }