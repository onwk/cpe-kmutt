import { CreateAssignInput } from './create-assign.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAssignInput extends PartialType(CreateAssignInput) {
  @Field(() => Int)
  id: number;
}
