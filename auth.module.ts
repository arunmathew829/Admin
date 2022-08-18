import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdminModule } from 'src/Admin/admin.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStratergy } from './local.stratergy';
//import { ConfigModule } from '@nestjs/config';
import { JwtStratergy } from './jwt.stratergy';

@Module({
  imports: [
    AdminModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStratergy, JwtStratergy],
  exports: [AuthService],
})
export class AuthModule {}
