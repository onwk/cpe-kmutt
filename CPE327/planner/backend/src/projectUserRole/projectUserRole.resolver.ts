import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateProjectUserRoleInput } from './dto/create-projectUserRolet.input';
import { UpdateProjectUserRole } from './dto/update-projectUserRolet.input';
import { ProjectUserRole } from './entities/projectUserRole.entity';
import { ProjectUserRoleService } from './projectUserRole.service';

@Resolver(() => ProjectUserRole)
export class projectUserRoleResvoler {
  constructor(
    private readonly projectUserRoleService: ProjectUserRoleService,
  ) {}

  /**
   * Add member in this project
   *
   * parameter: user
   * parameter: createProjectUserRoleInput
   * returns:  project
   */
  @Mutation(() => Project)
  @UseGuards(GqlAuthGuard)
  addMember(
    @CurrentUser() user: User,
    @Args('addMemberInput') input: CreateProjectUserRoleInput,
  ) {
    // console.log("log 1 ", input);

    return this.projectUserRoleService.create(user.email, input);
  }

  /**
   * Query all Project
   * returns: all projectUserRole in database
   */
  @Query(() => [ProjectUserRole], { name: 'projectUserRoles' })
  findAll() {
    return this.projectUserRoleService.findAll();
  }

  /**
   *
   * parameter: id
   * returns: data in projectUserRoleid
   */
  @Query(() => ProjectUserRole, { name: 'projectUserRole' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.projectUserRoleService.findOne(id);
  }

  /**
   *
   * parammeter: input
   * returns: new data in projectUserRole
   */
  @Mutation(() => ProjectUserRole)
  updateproject_user_role(
    @Args('updateproject_user_roleInput') input: UpdateProjectUserRole,
  ) {
    return this.projectUserRoleService.update(input.id, input);
  }

  /**
   *
   * parameter: id
   * returns: "Delete Success"
   */
  @Mutation(() => ProjectUserRole)
  removeproject_user_role(@Args('id', { type: () => Int }) id: number) {
    return this.projectUserRoleService.remove(id);
  }

  /**
   *
   * parameter: id
   * returns: member in this project
   */
  @Query(() => [ProjectUserRole], { name: 'member' })
  findMember(@Args('id', { type: () => Int }) id: number) {
    return this.projectUserRoleService.findMember(id);
  }

  /**
   *
   * parameter: id
   * returns: project in this user
   */
  @Query(() => [ProjectUserRole], { name: 'findProjectByUser' })
  findByUser(@Args('id', { type: () => Int }) id: number) {
    return this.projectUserRoleService.findByUser(id);
  }
}
