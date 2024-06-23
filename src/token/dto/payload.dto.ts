import { IsNotEmpty } from "class-validator";

export class TokenPayloadDto {
    @IsNotEmpty()
    login: string
}