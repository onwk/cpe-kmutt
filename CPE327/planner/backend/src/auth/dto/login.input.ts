import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty } from "class-validator";

// input from user when logging in
@InputType()
class LoginInput{
    
    @Field()
    readonly email?: string;

    @IsNotEmpty()
    @Field()
    readonly password?: string;
}
export default LoginInput;