import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarkaService } from './marka.service';
import { MarkaController } from './marka.controller';
import { Marka } from './entities/marka.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Marka]), // Importing the Marka entity into the module
  ],
  controllers: [MarkaController], // Registering the controller
  providers: [MarkaService], // Registering the service
  exports: [MarkaService], // Exporting the service if needed
})
export class MarkaModule {}
