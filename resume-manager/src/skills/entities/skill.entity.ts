import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Resume } from '../../resumes/entities/resume.entity';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;
  @ManyToMany(
    type => Resume,
    (resume) => resume.skills,
    {
      onDelete:"CASCADE"
    }
  )
  resumes: Resume[];

}
