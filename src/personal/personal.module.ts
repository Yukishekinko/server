import { Module } from '@nestjs/common';
import { PersonalController } from './personal.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [PersonalController]
})
export class PersonalModule {}
