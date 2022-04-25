import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class SkillEntity {
  @PrimaryGeneratedColumn()
  id:number
  @Column({unique:true})
  name:string;
}
