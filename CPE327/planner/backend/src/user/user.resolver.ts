import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  //create user function
  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  //query all user information
  @Query(() => [User], { name: 'users' })
  @UseGuards(GqlAuthGuard)
  findAll() {
    return this.userService.findAll();
  }
  @Query(() => [User], { name: 'usersPartner' })
  // @UseGuards(GqlAuthGuard)
  findPartner(@Args('userId' , {type : () => Int} ) id: number) {
    return this.userService.getPartnerFromUserId(id);
  }

  //query specific user information by id
  @Query(() => User, { name: 'user' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  //query specific user information by email
  @Query(() => User, { name: 'email' })
  @UseGuards(GqlAuthGuard)
  findByEmail(@Args('email', { type: () => String }) email: string) {
    return this.userService.findByEmail(email);
  }

  //update user information
  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  //remove specific user information by id
  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
