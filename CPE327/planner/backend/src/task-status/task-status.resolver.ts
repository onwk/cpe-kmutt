import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TaskStatus } from './entities/task-status.entity';
import { CreateTaskStatusInput } from './dto/create-task-status.input';
import { UpdateTaskStatusInput } from './dto/update-task-status.input';
import { TaskStatusService } from './task-status.service';

@Resolver(() => TaskStatus)
export class TaskStatusResolver {
  constructor(private readonly taskStatusService: TaskStatusService) {}

  /**
   *
   * parameter: createTaskStatusInput
   * returns: Create TaskStatus
   */
  @Mutation(() => TaskStatus)
  createTaskStatus(
    @Args('createTaskStatusInput') createTaskStatusInput: CreateTaskStatusInput,
  ) {
    return this.taskStatusService.create(createTaskStatusInput);
  }

  /**
   * Query all taskStatus
   * returns: all taskStatus in database
   */

  @Query(() => [TaskStatus], { name: 'taskStatuses' })
  findAll() {
    return this.taskStatusService.findAll();
  }

  /**
   *
   * parameter: id
   * returns: data in taskStatusId
   */
  @Query(() => TaskStatus, { name: 'taskStatus' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.taskStatusService.findOne(id);
  }

  /**
   *
   * parameter: updatetaskStatusInput
   * returns: new data of taskStatus
   */
  @Mutation(() => TaskStatus)
  updateTaskStatus(
    @Args('updateTaskStatusInput') updateTaskStatusInput: UpdateTaskStatusInput,
  ) {
    return this.taskStatusService.update(
      updateTaskStatusInput.id,
      updateTaskStatusInput,
    );
  }

  /**
   *
   * parameter: id
   * returns: "Delete Success"
   */
  @Mutation(() => TaskStatus)
  removeTaskStatus(@Args('id', { type: () => Int }) id: number) {
    return this.taskStatusService.remove(id);
  }
}
