import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Admin } from 'src/admin/entities/admin.entity';


@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendMail(admin: Admin) {
    // console.log(admin);
    
    const url = `${process.env.API_HOST}:${process.env.API_PORT}/admin/activate/${admin.activation_link}`;
    // console.log(url);
    await this.mailerService.sendMail({
      to: admin.email,
      subject: 'Welcome to our Service! Confirm your email address',
      template: './confirmation',
      context: {
        name: admin.full_name,
        url,
      },
    });
  }
}
