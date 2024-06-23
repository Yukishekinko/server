import { Module } from '@nestjs/common';
import { PhotoController } from './photo.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PhotoController]
})
export class PhotoModule { }
