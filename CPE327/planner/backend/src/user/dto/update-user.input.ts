import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int)
  id: number;

  @Field({nullable: true})
  oldPassword?: string;
  
  @Field({nullable: true})
  job?: string;

  @Field({nullable: true})
  department?: string;

  @Field({nullable: true})
  organization?: string;

  @Field({nullable: true})
  address?: string;

  @Field({nullable: true})
  image?: string;
}
