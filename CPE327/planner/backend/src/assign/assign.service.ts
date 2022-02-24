import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenError } from 'apollo-server-errors';
import { ProjectUserRole } from 'src/projectUserRole/entities/projectUserRole.entity';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAssignInput } from './dto/create-assign.input';
import { UpdateAssignInput } from './dto/update-assign.input';
import { Assign } from './entities/assign.entity';

@Injectable()
export class AssignService {
  constructor(
    @InjectRepository(Assign)
    private assignRepository: Repository<Assign>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  /**
   * For Addmember in the task
   * 
   * parametert: createAssignInput 
   * returns: Created Assign 
   */
  async create(createAssignInput: CreateAssignInput): Promise<Assign[]> {
    const { userId, ...toCreate } = createAssignInput;

    //check for having that task
    const task = await this.taskRepository.findOne({
       taskId: toCreate.taskId,
    });

    if (!task) {
      throw new ForbiddenError('Do not have this task.');
    }

    //.map for checking and saving
    await Promise.all(
      userId.map(async (user) => {

        //check for having that user
        const member = await this.userRepository.findOne({
          where: { userId: user },
        });

        if (!member) {
          throw new ForbiddenError('Do not have this user.');
        }

        //check for having that user in this task
        const currentUser = await this.assignRepository.findOne({
          where: { user: member, task: task },
        });

        if (currentUser) {
          throw new ForbiddenError('Already have this user.');
        }

        //create new assign
        const newMember = this.assignRepository.create({
          user: member,
          task: task,
        });

        
        //save to database
        await this.taskRepository.save(task);
        await this.assignRepository.save(newMember);
      }),
    );

    //return Created Assign
    return this.assignRepository.find({
      where:{ task:task},
      relations:['task','task.taskStatusId']
    });
  }

  //find all assign in database
  async findAll(): Promise<Assign[]> {
    return await this.assignRepository.find({
      relations: ['user', 'task'],
    });
  }

  //find assign with id
  async findOne(id: number): Promise<Assign> {
    return await this.assignRepository.findOne({
      where: { id: id },
      relations: ['user', 'task'],
    });
  }

  //find member with taskId
  async findMember(id: Number): Promise<Assign[]> {
    return await this.assignRepository.find({
      where: { task: id },
      relations: ['user', 'task'],
    });
  }

  //update data in assign with id
  async update(
    id: number,
    updateAssignInput: UpdateAssignInput,
  ): Promise<Assign> {
    const project = await this.assignRepository.findOne(id);
    const update = Object.assign(project, updateAssignInput);
    return await this.assignRepository.save(update);
  }

  //remove assign with id
  async remove(id: number): Promise<string> {
    const task = await this.assignRepository.findOne(id);
    await this.assignRepository.delete(id);
    return 'Delete Success';
  }
}
