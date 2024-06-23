import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateBackstageDto } from './dto/create_backstage.dto';

@ApiTags('Бэкстейджи')
@Controller('backstage')
export class BackstageController {

    @Get()
    async getAll() {

    }

    @Get(':id/photo')
    async getPhotoFromOne(@Param('id') id: number) {
        return id;
    }

    @Get(':id/video')
    async getVideosFromOne(@Param('id') id: number) {
        return id;
    }

    @ApiBearerAuth()
    @Post()
    async create(@Body() dto: CreateBackstageDto) {

    }

    @ApiBearerAuth()
    @Delete()
    async delete() {

    }
}
