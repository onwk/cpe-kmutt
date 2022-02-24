import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenError } from 'apollo-server-errors';
import { Repository } from 'typeorm';
import { CreateTaskStatusInput } from './dto/create-task-status.input';
import { UpdateTaskStatusInput } from './dto/update-task-status.input';
import { TaskStatus } from './entities/task-status.entity';

@Injectable()
export class TaskStatusService {
  constructor(
    @InjectRepository(TaskStatus)
    private taskStatusRepository: Repository<TaskStatus>,
  ) {}

  /**
   * For create taskStatus
   *
   *
   * parameter: createTaskStatusInput
   * returns: Created TaskStatus
   */
  async create(
    createTaskStatusInput: CreateTaskStatusInput,
  ): Promise<TaskStatus> {
    //if already has this taskStatus
    const status = await this.taskStatusRepository.findOne({
      taskStatus: createTaskStatusInput.taskStatus,
    });
    if (status) {
      throw new ForbiddenError('Status already existed.');
    }
    const newTaskStatus = this.taskStatusRepository.create(
      createTaskStatusInput,
    );
    return await this.taskStatusRepository.save(newTaskStatus);
  }

  //find all taskStatus in databas
  async findAll(): Promise<TaskStatus[]> {
    return await this.taskStatusRepository.find();
  }

  //find taskStatus with id
  async findOne(id: number): Promise<TaskStatus> {
    return await this.taskStatusRepository.findOne({
      where: { taskStatusId: id },
    });
  }

  //update data in taskStatus with id
  async update(
    id: number,
    updateTaskStatusInput: UpdateTaskStatusInput,
  ): Promise<TaskStatus> {
    const task = await this.taskStatusRepository.findOne(id);
    const update = Object.assign(task, updateTaskStatusInput);
    return await this.taskStatusRepository.save(update);
  }

  //remove taskStatus with id
  async remove(id: number): Promise<string> {
    const task = await this.taskStatusRepository.findOne(id);
    await this.taskStatusRepository.delete(id);
    return 'Delete Success';
  }
}
