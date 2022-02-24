import { CreateTaskStatusInput } from './create-task-status.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTaskStatusInput extends PartialType(CreateTaskStatusInput) {
  @Field(() => Int)
  id: number;
}
