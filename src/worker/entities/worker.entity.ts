import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Worker {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  full_name: string;

  @Column()
  @ApiProperty()
  age: number;

  @Column()
  @ApiProperty()
  address: string;

  @Column()
  @ApiProperty()
  phone_number: string;

  @Column()
  @ApiProperty()
  skills: string;

  @Column()
  @ApiProperty()
  passport_number: string;

  @Column()
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  password: string;

  @Column({ default: true })
  @ApiProperty()
  status: boolean;

  @Column({nullable:true})
  @ApiProperty()
  hashed_refresh_token: string;
}
