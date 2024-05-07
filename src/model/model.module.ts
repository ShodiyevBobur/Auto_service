import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ModelService } from './model.service';
import { ModelController } from './model.controller';
import { Model } from './entities/model.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Model]), // Importing the Model entity into the module
  ],
  controllers: [ModelController], // Registering the controller
  providers: [ModelService], // Registering the service
  exports: [ModelService], // Exporting the service if needed
})
export class ModelModule {}
