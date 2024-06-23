import { ApiProperty } from "@nestjs/swagger";

export class CreateBackstageDto {

    @ApiProperty()
    published: boolean

    @ApiProperty({type: 'string', format: 'date'})
    date: string
}