import { Body, Controller, Delete, Get, Param, Patch, Post, Req, StreamableFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { Request } from 'express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Public } from 'src/auth/decorators/public.decorator';
import { CreatePhotosetDto } from './dto/create_photoset.dto';
import { PhotosetService } from './photoset.service';

@ApiTags('Съёмки')
@Controller('photoset')
export class PhotosetController {

    constructor(private readonly photosetService: PhotosetService) { }

    @Public()
    @Get()
    async getAll() {
        return await this.photosetService.getAllPhotosets()
    }

    @Get(':id')
    async getOne(@Param('id') id: string) {
        return await this.photosetService.getPhotoset(id)
    }

    @Get(':id/photos')
    async getOnePhotos(@Param('id') id: string) {
        return await this.photosetService.getPhotosetPhotos(id)
    }

    @Public()
    @Get(':id/download')
    async download(@Param('id') id: string) {
        const file = await this.photosetService.download(id);
        return new StreamableFile(file, { type: 'application/zip' });
    }

    @Post()
    @UseInterceptors(FilesInterceptor('files', 60, {
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

        }),

    }))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'List of files',
        type: CreatePhotosetDto
    })
    @Public()
    async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>, @Req() request: Request, @Body() data: CreatePhotosetDto) {
        const photoset = await this.photosetService.createPhotoset(data.name, data.type, data.date)
        console.log(request);
        files.forEach(async (file) => {
            await this.photosetService.addPhotoToPhotoset(file.filename, photoset.id);
        })

    }

    @ApiBearerAuth()
    @Patch(':id')
    async update() {

    }

    @ApiBearerAuth()
    @Delete(':id')
    async delete(@Param() id: string) {
        await this.photosetService.delete(id)
    }
}
