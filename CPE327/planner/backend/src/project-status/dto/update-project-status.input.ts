import { CreateProjectStatusInput } from './create-project-status.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProjectStatusInput extends PartialType(CreateProjectStatusInput) {
  @Field(() => Int)
  id: number;
}
