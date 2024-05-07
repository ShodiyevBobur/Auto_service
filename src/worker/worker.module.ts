import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkerService } from './worker.service';
import { WorkerController } from './worker.controller';
import { Worker } from './entities/worker.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Worker]),
  JwtModule.register({}),
  JwtModule
],
  providers: [WorkerService],
  controllers: [WorkerController],
  exports: [WorkerService], // Exporting WorkerService
})
export class WorkerModule {}
