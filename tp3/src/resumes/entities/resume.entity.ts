import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable, ManyToMany, ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Skill } from '../../skills/entities/skill.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Resume {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public first_name: string;
  @Column()
  public last_name: string;
  @Column()
  public description: string = '';
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
  @Column()
  age:number
  @Column()
  path:string;
  @JoinTable()
  @ManyToMany(
    type => Skill,
    (skill)=>skill.resumes,
    {
      cascade:true,
    }
    )
  skills: Skill[];
  @ManyToOne(
    type =>User,
    user=>user.resumes,
  )
  user:User;
}
