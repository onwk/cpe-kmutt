import { InputType, Int, Field } from '@nestjs/graphql';

/**
 * Input data for service function
 */
@InputType()
export class CreateProjectInput {
  @Field()
  projectName: string;

  @Field(() => Int)
  projectStatusId: number;

  @Field(() => Int, { nullable: true })
  ownerId?: number;

  @Field()
  description: string;

  @Field()
  startDate: Date;

  @Field()
  dueDate: Date;

  @Field({ nullable: true })
  completeDate?: Date;

  @Field(() => [String])
  members: string[];
}
