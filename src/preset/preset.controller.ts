import { Body, Controller, Get, Param, Post, Req, StreamableFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { Request } from 'express';
import { createReadStream, existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Public } from 'src/auth/decorators/public.decorator';
import { CreatePresetDto } from './dto/CreatePresetDto';
import { PresetService } from './preset.service';

@ApiTags('Пресеты')
@Controller('preset')
export class PresetController {

    constructor (private readonly preset: PresetService) { }

    @Public()
    @ApiBearerAuth()
    @Post()
    @UseInterceptors(FileFieldsInterceptor([{ name: 'original', maxCount: 1 }, { name: 'result', maxCount: 1 }, { name: 'preset', maxCount: 1}], {
        storage: diskStorage({
            destination: async (req, file, cb) => {
                const uploadPath = `./uploads`;
                if (!existsSync(uploadPath)) {
                    mkdirSync(uploadPath);
                }

                cb(null, uploadPath);
            },
            filename: (req, file, cb) => {
                const randomName = randomUUID();
                cb(null, `${randomName}${extname(file.originalname)}`)
            },

        })
    }))
    async create(@Req() request: Request, @UploadedFiles() files: { original?: Express.Multer.File[], result?: Express.Multer.File[], preset?: Express.Multer.File[]}, @Body() data: CreatePresetDto) {
        await this.preset.create(data.name, data.description, parseInt(data.price), files.original[0].filename, files.result[0].filename, files.preset[0].filename);
    }

    @Public()
    @Get()
    async getAll() {
        return await this.preset.getAll();
    }
    
    @Public()
    @Get(':path') 
    async getPhoto(@Param('path') path: string) {
        return new StreamableFile(createReadStream(join(process.cwd(), `/uploads/${path}`)))
    }
}
