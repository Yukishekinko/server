import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Public } from 'src/auth/decorators/public.decorator';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('photo')
export class PhotoController {

    constructor(private readonly prisma: PrismaService) { }

    @Public()
    @Get(':id')
    async getPhoto(@Param('id') id: string) {
        const photo = await this.prisma.photo.findFirst({ where: { id: id } })
        const file = createReadStream(join(process.cwd(), `/uploads/${photo.path}`))
        return new StreamableFile(file);
    }
}
