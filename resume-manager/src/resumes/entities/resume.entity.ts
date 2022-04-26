import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable, ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Skill } from '../../skills/entities/skill.entity';

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
}
