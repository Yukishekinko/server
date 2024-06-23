import { IsNotEmpty, IsString } from "class-validator";

export class CreatePhotosetDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    date: string

    @IsString()
    @IsNotEmpty()
    type: string
}
