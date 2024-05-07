import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Model {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;


  @Column() // For example, let's add another column
  @ApiProperty()
  name: string;


  @Column({ name: 'markaId', unique: false }) // Define column name as 'markaId'
  @ApiProperty()
  markaId: number;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: Date;
}
