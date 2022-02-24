import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { User } from 'src/user/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  /**
   * Create Task
   *
   * parameter: user
   * parameter: createTaskInput
   * returns:
   */
  @Mutation(() => Task)
  @UseGuards(GqlAuthGuard)
  createTask(
    @CurrentUser() user: User,
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
  ): Promise<Task> {
    return this.taskService.create(user.email, createTaskInput);
  }

  /**
   * Query all task
   * returns: all task in database
   */
  @Query(() => [Task], { name: 'tasks' })
  findAll() {
    return this.taskService.findAll();
  }

    /**
   * Query all task by userID
   * returns: all task in database
   */
     @Query(() => [Task], { name: 'userTasks' })
     findAllByUserId(@Args('userId' , {type : () => Int}) userID : number) {
       return this.taskService.findAllByUserID(userID);
     }

  /**
   *
   * parameter: id
   * returns: data in taskId
   */
  @Query(() => Task, { name: 'task' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.taskService.findOne(id);
  }

  /**
   *
   * parameter: updateTaskInput
   * returns: task
   */
  @Mutation(() => Task)
  updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.taskService.update(updateTaskInput.id, updateTaskInput);
  }

  /**
   *
   * parameter: id
   * returns: "Delete Success"
   */
  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  removeTask(
    @CurrentUser() user: User,
    @Args('id', { type: () => Int }) id: number) : Promise<String> {
    return this.taskService.remove(user.email,id);
  }
}
