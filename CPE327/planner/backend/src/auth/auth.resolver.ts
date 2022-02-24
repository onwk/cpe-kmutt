import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import loginInput from "./dto/login.input";


@Resolver()
export class AuthResolver{
    constructor(private readonly authService: AuthService){}

    @Mutation(() => String)
    login(@Args('loginInput') loginInput: loginInput){
        return this.authService.login(loginInput);
    }
}