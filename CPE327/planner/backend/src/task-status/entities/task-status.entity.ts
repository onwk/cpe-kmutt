import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Task } from 'src/task/entities/task.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

@Entity()
@ObjectType()
export class TaskStatus {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  taskStatusId: number;

  @Column()
  @Field()
  taskStatus: string;

  @OneToMany(() => Task, (task) => task.taskStatusId, { eager: true })
  @Field(() => [Task])
  task: Task[];
}
