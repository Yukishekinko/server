import { Module } from '@nestjs/common';
import { PhotosetController } from './photoset.controller';
import { PhotosetService } from './photoset.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PhotosetController],
  providers: [PhotosetService]
})
export class PhotosetModule {}
