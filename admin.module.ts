import { Module } from '@nestjs/common';
import { Admin } from './admin.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
  imports: [TypeOrmModule.forFeature([Admin])],
})
export class AdminModule {}
