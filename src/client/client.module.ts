import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { Client } from './entities/client.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Client]), // Importing entities and repository
  ],
  controllers: [ClientController],
  providers: [ClientService], // Providing the service
  exports: [ClientService], // Exporting the service if needed
})
export class ClientModule {}
