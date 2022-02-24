import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ProjectUserRole } from 'src/projectUserRole/entities/projectUserRole.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(ProjectUserRole)
    private projectUserRoleRepository: Repository<ProjectUserRole>,
  ) {}

  //create user function
  async create(createUserInput: CreateUserInput): Promise<User> {
    //find if this user exists by email
    const user = await this.userRepository.findOne({
      email: createUserInput.email,
    });

    //if user existed
    //send error message
    if (user) {
      throw new ForbiddenError('User already existed.');
    }

    //if user does not exist
    //hash a password for more secure
    const hashPassword = await bcrypt.hash(createUserInput.password, 10);
    createUserInput.password = hashPassword;

    //create new user with createUserInput
    const newUser = this.userRepository.create(createUserInput);
    return await this.userRepository.save(newUser);
  }

  //find all user information
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  //find specific user by id
  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneOrFail(id);
  }

  //find specific user by email
  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({email: email});
    //if user does not exist
    //send error message
    if(!user){
      throw new ForbiddenError('User not found.');
    }
    return user;
  }

  //update user information
  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {

    //query user information by id
    const user = await this.userRepository.findOne(id);

    //if user does not exist
    //send error message
    if (!user) {
      throw new ForbiddenError('User not found.');
    }

    //if user input old password
    if(updateUserInput.oldPassword){
      //check if input password match with password in database
      const passwordMatch = await bcrypt.compare(
        updateUserInput.oldPassword,
        user.password,
      );
      
      if(passwordMatch){ //if password is correct
        if(updateUserInput.password){ //check if user input new password
          const hashPassword = await bcrypt.hash(updateUserInput.password, 10); //hash new password
          updateUserInput.password = hashPassword; //store hash password in input
        }
      }else{
        throw new ForbiddenError('Password does not match');
      }
    }

    //update user information with input
    const updated = Object.assign(user, updateUserInput);
    return await this.userRepository.save(updated);
  }

  //delete specific user by id
  async remove(id: number): Promise<string> {
    await this.userRepository.delete(id);
    return 'Delete success';
  }

  async getPartnerFromUserId(userId: number): Promise<User[]> {
    const projectUserRoles = await this.projectUserRoleRepository.find({
      where: {
        user: {
          userId: userId,
        },
      },
      relations : ['project' , 'project.projectUserRole' , 'project.projectUserRole.user'],
    });
    const projects = projectUserRoles.map((pJuserRole) => pJuserRole.project.projectUserRole);
    const arr : User[] = [];
    const pjRolless = projects.forEach(pjRoles => {
      pjRoles.forEach(pjRole => {
        arr.push(pjRole.user);
      })
    });
    const users = arr.filter((e, i) => e.userId != userId);
    const uusers = users.filter((item ,index , self) => index === self.findIndex((u) => u.userId === item.userId))

    return uusers;

  }
}