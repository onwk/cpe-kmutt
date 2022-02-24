import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//JWT Guard
//generate token to use in other session for user who logged in
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}