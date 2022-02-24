import { Injectable } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenError } from 'apollo-server-errors';
import { Project } from 'src/project/entities/project.entity';
import { Assign } from 'src/assign/entities/assign.entity';
import { User } from 'src/user/entities/user.entity';
import { TaskStatus } from 'src/task-status/entities/task-status.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Assign)
    private assignRepository: Repository<Assign>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(TaskStatus)
    private taskStatusRepository: Repository<TaskStatus>,
  ) {}

  /**
   * For create task
   *
   * parameter: ownerEmail
   * parameter: createTaskInput
   * returns: Created Task
   */
  async create(
    ownerEmail: String,
    createTaskInput: CreateTaskInput,
  ): Promise<Task> {
    //Check for don't have this projectname before
    const alreadyTask = await this.taskRepository.findOne({
      where: { taskName: createTaskInput.taskName },
    });

    if (alreadyTask) {
      throw new ForbiddenError('Task already existed.');
    }

    //find owner from user entity
    const owner = await this.userRepository.findOne({
      where: { email: ownerEmail },
    });

    // console.log(ownerEmail)

    //save ownerId of this task
    createTaskInput.onwerId = owner.userId;

    //create Task
    const newTask = this.taskRepository.create(createTaskInput);

    //Relation to project
    const project = await this.projectRepository.findOne(
      createTaskInput.projectId,
    );

    project.task.push(newTask);

    //Relation to status
    const status = await this.taskStatusRepository.findOne(
      createTaskInput.taskStatus,
    );
    status.task.push(newTask);

    await this.taskRepository.save(newTask);
    await this.projectRepository.save(project);
    await this.taskStatusRepository.save(status);

    const task = await this.taskRepository.findOne(newTask);

    //Relation to user
    // .map for addmember in assign entity
    await Promise.all(
      createTaskInput.userId.map(async (user) => {
        const member = await this.userRepository.findOne({
          where: { userId: user },
        });

        //Create Assign
        const newAssign = this.assignRepository.create();
        // console.log(task.assign);

        member.assign.push(newAssign);
        task.assign.push(newAssign);

        //save data
        await this.assignRepository.save(newAssign);
        await this.userRepository.save(member);
        await this.taskRepository.save(task);
      }),
    );

    //return task
    return await this.taskRepository.findOne({
      where: { taskId: newTask.taskId },
      relations: ['project', 'taskStatusId', 'assign'],
    });
  }

  //find all task in database
  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find({
      relations: ['taskStatusId','assign','assign.user'],
    });
  }

  async findAllByUserID(userId: number): Promise<Task[]> {
    console.log(userId);
    const assigns = await this.assignRepository.find({
      where: {
          user : {
            userId: userId
          }
      },
      relations: ['task', 'user' , 'task.taskStatusId']
      // relations: ['taskStatusId','assign','assign.user'],
    });
    console.log(assigns);
    const tasks = assigns.map((assign) => assign.task);
    return tasks;
  }

  //find task with id
  async findOne(id: number): Promise<Task> {
    return await this.taskRepository.findOneOrFail({
      where: { taskId: id },
      relations: ['taskStatusId'],
    });
  }
  /**
   *
   * parameter: id
   * parameter: updateTaskInput
   * returns: Edited Task
   */
  async update(id: number, updateTaskInput: UpdateTaskInput): Promise<Task> {
    const task = await this.taskRepository.findOneOrFail({
      where: { taskId: id },
      relations: ['project', 'taskStatusId'],
    });

    if (updateTaskInput.taskStatus) {
      task.taskStatusId.taskStatusId = updateTaskInput.taskStatus;
    }
    //check if don't edit member
    if (!updateTaskInput.userId) {
      const updateTask = Object.assign(task, updateTaskInput);
      return await this.taskRepository.save(updateTask);
    } else {
      const { userId, ...restInput } = updateTaskInput;

      const updateTask = Object.assign(task, restInput);

      //find all member in task
      const allMember = await this.assignRepository.find({
        where: {
          task: task,
        },
        relations: ['task', 'user'],
      });
      // console.log(allMember);

      // .map for delete member in task
      await Promise.all(
        allMember.map(async (member) => {
          //user in task  != member from input
          if (!userId.includes(member.user.userId)) {
            // console.log('Delete member ' + member.user.userId);

            //delete
            await this.assignRepository.delete(member.id);
          }
        }),
      );
      await this.taskRepository.save(updateTask);

      return await this.taskRepository.findOne({
        where: { taskId: updateTask.id },
        relations: ['project', 'assign', 'taskStatusId'],
      });
    }
  }

  //remove task with id
  async remove(
    ownerEmail:String,
    id: number): Promise<string> {
    const task = await this.taskRepository.findOne({
      where: { taskId: id },
      relations: ['project', 'taskStatusId'],
    });;
    
    //Check if don't have this task
    if(!task){
      throw new ForbiddenError('Do not have this task');
    }
    //Check if that user is Onwer
    const owner = await this.userRepository.findOne({
      where: { email: ownerEmail },
    });

    if (owner.userId != task.onwerId) {
      throw new ForbiddenError('Your are not manager');
    }


    await this.taskRepository.delete(id);
    return 'Delete Success';
  }
}
