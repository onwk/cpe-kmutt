import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenError } from 'apollo-server-errors';
import { ProjectStatus } from 'src/project-status/entities/project-status.entity';
import {
  ProjectUserRole,
  Role,
} from 'src/projectUserRole/entities/projectUserRole.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(ProjectUserRole)
    private projectUserRoleRepository: Repository<ProjectUserRole>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(ProjectStatus)
    private projectStatusRepository: Repository<ProjectStatus>,
  ) {}

  /**
   * For Create Project
   *
   * parameter: ownerEmail
   * parameter: createProjectInput
   * returns: ProjectUserRole
   */
  async create(
    ownerEmail: string,
    createProjectInput: CreateProjectInput,
  ): Promise<ProjectUserRole> {
    //Check for don't have this projectname before
    const alreadyProject = await this.projectRepository.findOne({
      where: {
        projectName: createProjectInput.projectName,
      },
    });

    if (alreadyProject) {
      throw new ForbiddenError('Already has this project');
    }

    //find owner from user entity
    const owner = await this.userRepository.findOne({
      where: { email: ownerEmail },
    });
    // console.log(ownerEmail)

    //save ownerId of this project
    createProjectInput.ownerId = owner.userId;

    //Create Project
    const newProject = this.projectRepository.create(createProjectInput);

    //Check projectStatus
    const status = await this.projectStatusRepository.findOne({
      where: { projectStatusId: createProjectInput.projectStatusId },
      relations: ['project'],
    });

    if (!status) {
      throw new ForbiddenError('Not have this status in project');
    }

    //Relation to status
    status.project.push(newProject);

    //save Project
    await this.projectRepository.save(newProject);

    const project = await this.projectRepository.findOne({
      where: { projectId: newProject.projectId },
      relations: ['projectStatus', 'projectUserRole'],
    });

    // .map for addmember in projectUserRole Entity
    await Promise.all(
      createProjectInput.members.map(async (userId) => {
        const user = await this.userRepository.findOne({
          where: { userId: userId },
          relations: ['projectUserRole'],
        });
        if (!userId) {
          throw new ForbiddenError('Not have this user');
        }

        //Create projectUserRole
        const newProjectUserRole = this.projectUserRoleRepository.create({
          project: project,
          user: user,
          role: Role.EMPLOYEE,
        });

        //push projectUserRole
        user.projectUserRole.push(newProjectUserRole);
        project.projectUserRole.push(newProjectUserRole);

        //save data
        await this.projectUserRoleRepository.save(newProjectUserRole);
        await this.userRepository.save(user);
        await this.projectRepository.save(project);
      }),
    );

    await this.projectRepository.save(newProject);
    await this.projectStatusRepository.save(status);

    //return projectUserRoleid
    return await this.projectUserRoleRepository.findOne({
      where: { project: project },
      relations: ['user', 'project', 'project.projectStatus'],
    });

    // return newProject;
  }

  //find all project in database
  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find({
      relations: ['projectUserRole', 'projectStatus'],
    });
  }

  //find project with id
  async findOne(id: number): Promise<Project> {
    return await this.projectRepository.findOneOrFail({
      where: { projectId: id },
      relations: [
        'task',
        'task.taskStatusId',
        'task.assign',
        'projectStatus',
        'projectUserRole',
      ],
    });
  }

  //Edit data in project
  async update(
    ownerEmail: String,
    id: number,
    updateProjectInput: UpdateProjectInput,
  ): Promise<Project> {
    const project = await this.projectRepository.findOneOrFail({
      where: { projectId: id },
      relations: ['task', 'projectStatus'],
    });

    //Check if that user is Onwer
    const owner = await this.userRepository.findOne({
      where: { email: ownerEmail },
    });

    if (owner.userId != project.ownerId) {
      throw new ForbiddenError('Your are not manager');
    }

    //Edit status in Project
    if (updateProjectInput.projectStatusId) {
      project.projectStatus.projectStatusId =
        updateProjectInput.projectStatusId;
    }

    //if don't edit member
    if (!updateProjectInput.members) {
      const updateProject = Object.assign(project, updateProjectInput);
      return await this.projectRepository.save(updateProject);
    } else {
      const { members, ...restInput } = updateProjectInput;

      const updateProject = Object.assign(project, restInput);

      //find all member in project
      const allMember = await this.projectUserRoleRepository.find({
        where: {
          project: id,
        },
        relations: ['user', 'project'],
      });

      // .map for delete member in project
      await Promise.all(
        allMember.map(async (member) => {
          //user in project != member from input
          if (!members.includes(member.user.userId.toString())) {
            // console.log('Delete member ' + member.user.userId);

            //delete
            await this.projectUserRoleRepository.delete(
              member.projectUserRoleid,
            );
          }
        }),
      );
      return await this.projectRepository.save(updateProject);
    }
  }

  //remove project with id
  async remove(ownerEmail: String, id: number): Promise<String> {
    const project = await this.projectRepository.findOne({
      where: { projectId: id },
      relations: ['task', 'projectStatus'],
    });

    //Check if don't have this project
    if (!project) {
      throw new ForbiddenError('Do not have this project');
    }

    //Check if that user is Onwer
    const owner = await this.userRepository.findOne({
      where: { email: ownerEmail },
    });

    if (owner.userId != project.ownerId) {
      throw new ForbiddenError('Your are not manager');
    }

    await this.projectRepository.delete(id);
    return 'Delete Success';
  }
}
