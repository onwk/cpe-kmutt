import { InputType, Int, Field } from '@nestjs/graphql';
import { Role } from '../entities/projectUserRole.entity';

/**
 * Input data for service function
 */
@InputType()
export class CreateProjectUserRoleInput {
  @Field(() => [Int])
  userId: number[];

  @Field(() => Int)
  project: number;

  @Field(() => Role)
  role: Role;
}
