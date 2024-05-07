import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AvtoType } from 'src/avto-type/entities/avto-type.entity';
import { Model } from 'src/model/entities/model.entity';
import { Client } from 'src/client/entities/client.entity';
import { Marka } from 'src/marka/entities/marka.entity';


@Entity()
export class Avto {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ name: 'avto_number' })
  @ApiProperty()
  avtoNumber: string;

  @ManyToOne(() => AvtoType, { eager: true })
  @JoinColumn({ name: 'avto_type_id' })
  @ApiProperty({ type: () => AvtoType })
  avtoType: number;

  @ManyToOne(() => Model, { eager: true })
  @JoinColumn({ name: 'model_id' })
  @ApiProperty({ type: () => Model })
  model: number;

  @ManyToOne(() => Client, { eager: true })
  @JoinColumn({ name: 'client_id' })
  @ApiProperty({ type: () => Client })
  client: number;

  @ManyToOne(() => Marka, { eager: true })
  @JoinColumn({ name: 'marka_id' })
  @ApiProperty({ type: () => Marka })
  marka: number;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: Date;
}
