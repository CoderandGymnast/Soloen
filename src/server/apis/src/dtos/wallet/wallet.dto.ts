const MAX_LENGTH_LABEL = 100

class CreateWalletRequestDTO {
    label?: string
}

class CreateWalletResponseDTO {
    id: string
}

export { CreateWalletRequestDTO, CreateWalletResponseDTO, MAX_LENGTH_LABEL}