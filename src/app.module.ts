import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { BackstageModule } from './backstage/backstage.module';
import { BasketModule } from './basket/basket.module';
import { PersonalModule } from './personal/personal.module';
import { PhotoModule } from './photo/photo.module';
import { PhotosetModule } from './photoset/photoset.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { PresetModule } from './preset/preset.module';
import { TokenModule } from './token/token.module';
import { PortfolioPhotoModule } from './portfolio-photo/portfolio-photo.module';

@Module({
  imports: [AuthModule,
    BackstageModule,
    PhotosetModule,
    PresetModule,
    TokenModule,
    ThrottlerModule.forRoot([{
      ttl: 1000,
      limit: 3
    }]),
    PersonalModule,
    BasketModule,
    PortfolioModule,
    PhotoModule,
    PortfolioPhotoModule],
})
export class AppModule { }
