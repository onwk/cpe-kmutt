import { InputType, Field } from '@nestjs/graphql';
import { IsAlpha, IsEmail, IsEmpty} from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsEmail()
  @Field()
  email: string;

  @Field()
  password: string;

  @IsAlpha()
  @Field()
  firstName: string;

  @IsAlpha()
  @Field()
  lastName: string;
}
