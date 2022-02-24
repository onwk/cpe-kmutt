import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

//Authenticated Guard
//to check if user is logged in
@Injectable()
export class AuthenticatedGuard implements CanActivate {
    async canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest();
        
        //to check if user is authenticated
        return request.isAuthenticated;
    }
}