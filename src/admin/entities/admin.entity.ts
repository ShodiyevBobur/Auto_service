import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  full_name: string;

  @Column({unique:true})
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  password: string;

  @Column()
  @ApiProperty()
  phone_number: string;

  @Column()
  @ApiProperty()
  address: string;

  @Column()
  @ApiProperty()
  passport_number: string;

  @Column({ default: false })
  @ApiProperty()
  is_active: boolean;

  @Column({ default: true })
  @ApiProperty()
  is_creator: boolean;

  @Column({nullable:true})
  @ApiProperty()
  hashed_refresh_token: string;
  
  @Column({nullable:true})
  @ApiProperty()
  activation_link: string;


}
