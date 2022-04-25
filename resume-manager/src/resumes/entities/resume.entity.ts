import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ResumeEntity {
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
}
