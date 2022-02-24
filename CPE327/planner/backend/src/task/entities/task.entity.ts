import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Assign } from 'src/assign/entities/assign.entity';
import { Project } from 'src/project/entities/project.entity';
import { TaskStatus } from 'src/task-status/entities/task-status.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  taskId: number;

  @ManyToOne(() => Project, (project) => project.task, {
    onDelete: 'CASCADE',
  })
  @Field(() => Project)
  project: Project;

  @ManyToOne(() => TaskStatus, (taskStatus) => taskStatus.task, {
    onDelete: 'CASCADE',
  })
  @Field(() => TaskStatus)
  taskStatusId: TaskStatus;

  @Column()
  @Field()
  taskName: string;

  @OneToMany(() => Assign, (assign) => assign.task, { eager: true })
  @Field(() => [Assign])
  assign: Assign[];

  @Column()
  @Field()
  startDate: Date;

  @Column()
  @Field()
  dueDate: Date;

  @Column({ nullable: true })
  @Field()
  completeDate?: Date;

  @Column()
  @Field()
  description: string;

  @Column({ nullable: true })
  @Field()
  onwerId: number;
}
