import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


//LocalAuthGuard
//for simple log in authentication
@Injectable()
export class LocalAuthGuard extends AuthGuard('local'){ 
    //use Guard to trigger if user do not log in
    //and tell us that we use 'Local Strategy'
    }
