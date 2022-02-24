import { InputType, Int, Field } from '@nestjs/graphql';

/**
 * Input data for service function
 */
@InputType()
export class CreateTaskStatusInput {
  @Field()
  taskStatus: string;
}
