import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Resume } from '../../resumes/entities/resume.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true, length: 15 })
  username: string;
  @Column({ unique: true, length: 15 })
  email: string;
  @Column({ length: 15 })
  password: string;
  @OneToMany(
    type => Resume,
    resume => resume.user,
    {
      onDelete: 'CASCADE',
    },
  )
  resumes: Resume[];


  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
}
