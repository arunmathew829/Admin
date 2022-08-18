import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBearerAuth()
  login(@Request() req): any {
    // return { msg: 'Logged In!' };
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  @ApiBearerAuth()
  getlogin(@Request() req): string {
    return req.user;
  }
}
