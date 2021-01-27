import { UserEntity } from "src/entities/users.entity"

class CreateUserRequestDTO {
    username: string
    password: string
}

class CreateUserResponseDTO {
    message: string
    user:{
        username: string 
    }
}

export { CreateUserRequestDTO, CreateUserResponseDTO }