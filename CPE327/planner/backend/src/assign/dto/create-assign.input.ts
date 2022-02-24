import { InputType, Int, Field } from '@nestjs/graphql';

/**
 * Input data for service function
 */
@InputType()
export class CreateAssignInput {
  @Field(() => [Int])
  userId: number[];

  @Field(() => Int)
  taskId: number;
}
