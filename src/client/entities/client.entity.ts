import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  name: string;


  @Column({ nullable: true })
  @ApiProperty({ required: false, name: 'phone_number' })
  phoneNumber: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  address: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

//   @OneToMany(() => Post, (post) => post.author)
//   @ApiProperty({ type: () => [Post] })
//   posts: Post[];
}
