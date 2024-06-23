import { Module } from '@nestjs/common';
import { PortfolioPhotoController } from './portfolio-photo.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PortfolioPhotoController]
})
export class PortfolioPhotoModule {}
