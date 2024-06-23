import { Body, Module, Post } from '@nestjs/common';
import { BackstageController } from './backstage.controller';
import { CreateBackstageDto } from './dto/create_backstage.dto';

@Module({
  controllers: [BackstageController]
})
export class BackstageModule {
  @Post()
  async createBackstage(@Body() dto: CreateBackstageDto){
    
  }
}
