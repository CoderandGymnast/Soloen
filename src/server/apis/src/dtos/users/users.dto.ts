import { User } from "src/entities/user.entity"

class GetuserRequestDTO {
    userEmail: string
}
class GetuserResponseDTO {
    userEmail: string
    userPassword: string
}
export {GetuserRequestDTO,GetuserResponseDTO }