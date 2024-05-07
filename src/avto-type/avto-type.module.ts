import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvtoTypeService } from './avto-type.service';
import { AvtoTypeController } from './avto-type.controller';
import { AvtoType } from './entities/avto-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AvtoType]), // Importing the AvtoType entity into the module
  ],
  controllers: [AvtoTypeController], // Registering the controller
  providers: [AvtoTypeService], // Registering the service
  exports: [AvtoTypeService], // Exporting the service if needed
})
export class AvtoTypeModule {}
