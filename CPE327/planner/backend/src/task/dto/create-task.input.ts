import { InputType, Int, Field } from '@nestjs/graphql';
import { TaskStatus } from 'src/task-status/entities/task-status.entity';

/**
 * Input data for service function
 */
@InputType()
export class CreateTaskInput {
  @Field(() => Int)
  projectId: number;

  @Field(() => [Int])
  userId: number[];

  @Field(() => Int)
  taskStatus: number;

  @Field()
  taskName: string;

  @Field(() => Int, { nullable: true })
  onwerId: number;

  @Field()
  startDate: Date;

  @Field()
  dueDate: Date;

  @Field({ nullable: true })
  completeDate?: Date;

  @Field()
  description?: string;
}
