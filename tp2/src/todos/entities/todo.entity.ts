import { TodoStatusEnum } from '../enums/todo-status.enum';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  public id: number = 0;
  @Column()
  public name: string = '';
  @Column()
  public description: string = '';
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
  @Column({
    type: 'enum',
    enum: TodoStatusEnum,
    default: TodoStatusEnum.waiting,
  })
  public status: TodoStatusEnum = TodoStatusEnum.waiting;
}

