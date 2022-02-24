import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";
import { constant } from "../constant";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    //constructor for validation
    constructor(private readonly userService: UserService){ 
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //request and validate it
            ignoreExpiration: false,
            secretOrKey: constant.secret //secret key for authentication
        });
    }

    //Validate user
    //return user's information
    async validate(payload: any){
        const { password, ...rest } = await this.userService.findOne(payload.sub);  
        return rest;
    }
}