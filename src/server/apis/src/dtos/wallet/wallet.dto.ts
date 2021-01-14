const MAX_LENGTH_LABEL = 255

class CreateWalletRequestDTO {
    label?: string
    xxx: String
}

class CreateWalletResponseDTO {
    id: number
}

export { CreateWalletRequestDTO, CreateWalletResponseDTO, MAX_LENGTH_LABEL}