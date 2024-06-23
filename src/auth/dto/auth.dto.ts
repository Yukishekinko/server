import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AuthDto {
    @IsNotEmpty()
    @ApiProperty({ minLength: 8 })
    login: string

    @IsNotEmpty()
    @ApiProperty({ minLength: 8 })
    password: string
}