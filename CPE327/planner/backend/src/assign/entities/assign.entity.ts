import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
@ObjectType()
export class Assign {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => Task, (task) => task.assign, { onDelete: 'CASCADE' })
  @Field(() => Task)
  task: Task;

  @ManyToOne(() => User, (user) => user.assign, { onDelete: 'CASCADE' })
  @Field(() => User)
  user: User;

  /**
   * for save what time that data has been update
   */
  @CreateDateColumn()
  @Field()
  created_at: Date;

  @UpdateDateColumn()
  @Field()
  updated_at: Date;
}
