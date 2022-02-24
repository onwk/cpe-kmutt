import { InputType, Field } from '@nestjs/graphql';


/**
 * Input data for service function
 */
@InputType()
export class CreateProjectStatusInput {
  @Field()
  projectStatus: string;

}
