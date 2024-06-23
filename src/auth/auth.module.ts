import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TokenModule } from 'src/token/token.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './guard/auth.guard';

@Module({
  imports: [
    PrismaModule,
    TokenModule,
    UserModule,
    JwtModule.register({})
  ],
  providers: [AuthService, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
  controllers: [AuthController]
})
export class AuthModule { }
