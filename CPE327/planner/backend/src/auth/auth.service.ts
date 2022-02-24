import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserInputError } from 'apollo-server-errors';
import LoginInput from './dto/login.input';
import { ForbiddenError } from 'apollo-server-express';
// import { ForbiddenError } from 'apollo-server-errors';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  //validate user
  async validateUser(LoginInput: LoginInput): Promise<any> {
    //find if recieved email is exists
    const user = await this.usersService.findByEmail(LoginInput.email); 
    
    //compare recieved password with password in DB
    const passwordMatch = await bcrypt.compare(
      LoginInput.password,
      user.password,
    ); 

    //then check if it's correct password
    if (user && passwordMatch) {
      const { password, ...rest } = user;
      return rest; //return user's information
    } else {
      throw new ForbiddenError('Incorrect pasword');
    }
  }

  async login(LoginInput: LoginInput) {
    const user = await this.validateUser(LoginInput);

    const payload = { email: user.email, sub: user.userId, img: user.image };

    return this.jwtService.sign(payload);
  }
}
