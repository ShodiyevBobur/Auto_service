import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin],), // Import the entity for TypeORM
    JwtModule.register({}),
    MailModule,
    JwtModule
  ],
  controllers: [AdminController], // Register the controller
  providers: [AdminService], // Register the service
  exports: [AdminService] // Export the service if needed by other modules
})
export class AdminModule {}
