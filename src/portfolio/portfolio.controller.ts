import { Body, Controller, Delete, Get, Param, Post, Req, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreatePhotosetDto } from 'src/photoset/dto/create_photoset.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { CreatePortfolioDto } from './dto/create_portfolio.dto';

@Controller('portfolio')
export class PortfolioController {
    constructor(private readonly portfolioService: PortfolioService) { }


    @Public()
    @Get()
    async getPortfolios() {
        return await this.portfolioService.getAllPortfolios()
    }

    @Public()
    @Get(':id')
    async getPortfolio(@Param('id') id: string) {
        return await this.portfolioService.getPortfolio(id)
    }

    @Public()
    @Get(':id/photos')
    async getPortfolioPhotos(@Param('id') id: string) {
        return await this.portfolioService.getPortfolioPhotos(id);
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
    async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>, @Req() request: Request, @Body() data: CreatePortfolioDto) {
        const portfolio = await this.portfolioService.createPortfolio(data.name, Boolean(data.published));

        files.forEach(async (file) => {
            await this.portfolioService.addPhotoToPortfolio(file.filename, portfolio.id)
        })

    }

    @Delete(':id')
    async delete(@Param() id: string) {
        await this.portfolioService.delete(id)
    }
}
