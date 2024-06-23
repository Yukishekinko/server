import { Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags("Личные данные")
@Controller('personal')
export class PersonalController {

    @ApiBearerAuth()
    @Post('bought-goods')
    async getGoods(){

    }
}
