import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { ProjectUserRole } from 'src/projectUserRole/entities/projectUserRole.entity';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { User } from 'src/user/entities/user.entity';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  /**
   * Create Project
   *
   * parameter: user
   * parameter: createProjectInput
   * returns: member in this project
   */
  @Mutation(() => ProjectUserRole)
  @UseGuards(GqlAuthGuard)
  createProject(
    @CurrentUser() user: User,
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
  ): Promise<ProjectUserRole> {
    return this.projectService.create(user.email, createProjectInput);
  }

  /**
   * Query all Project
   * returns: all project in database
   */
  @Query(() => [Project], { name: 'projects' })
  findAll() {
    return this.projectService.findAll();
  }

  /**
   *
   * parameter: id
   * returns: data in projectId
   */
  @Query(() => Project, { name: 'project' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.projectService.findOne(id);
  }

  /**
   *
   * parameter: user
   * parameter: updateProjectInput
   * returns: new data in project
   */
  @Mutation(() => Project)
  @UseGuards(GqlAuthGuard)
  updateProject(
    @CurrentUser() user: User,
    @Args('updateProjectInput') updateProjectInput: UpdateProjectInput,
  ): Promise<Project> {
    return this.projectService.update(
      user.email,
      updateProjectInput.id,
      updateProjectInput,
    );
  }

  /**
   *
   * parameter: id
   * returns: "Delete Success"
   */

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  removeProject(
    @CurrentUser() user: User,
    @Args('id', { type: () => Int }) id: number) : Promise<String> {
    return this.projectService.remove(user.email,id);
  }
}
