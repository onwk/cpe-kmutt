
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateProjectUserRoleInput } from './create-projectUserRolet.input';


@InputType()
export class UpdateProjectUserRole extends PartialType(CreateProjectUserRoleInput) {
  @Field(() => Int)
  id: number;
}