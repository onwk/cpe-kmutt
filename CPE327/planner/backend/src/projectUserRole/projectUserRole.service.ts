import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenError } from 'apollo-server-express';
import { ProjectStatus } from 'src/project-status/entities/project-status.entity';
import { Project } from 'src/project/entities/project.entity';
import { ProjectService } from 'src/project/project.service';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProjectUserRoleInput } from './dto/create-projectUserRolet.input';
import { UpdateProjectUserRole } from './dto/update-projectUserRolet.input';
import { ProjectUserRole } from './entities/projectUserRole.entity';

@Injectable()
export class ProjectUserRoleService {
  constructor(
    @InjectRepository(ProjectUserRole)
    private projectUserRoleRepository: Repository<ProjectUserRole>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  /**
   *
   * parameter: ownerEmail
   * parameter: createProjectUserRole
   * returns: Project
   */
  async create(
    ownerEmail: String,
    createProjectUserRole: CreateProjectUserRoleInput,
  ): Promise<Project> {
    const { userId, ...toCreate } = createProjectUserRole;

    //Check if don't have this projectId
    const project = await this.projectRepository.findOne({
      where: { projectId: toCreate.project },
      relations: ['projectUserRole', 'projectStatus'],
    });

    if (!project) {
      throw new ForbiddenError('Do not have this project.');
    }

    //Check if that user is Onwer
    const owner = await this.userRepository.findOne({
      where: { email: ownerEmail },
    });

    if (owner.userId != project.ownerId) {
      throw new ForbiddenError('Your are not manager');
    }

    // .map for add member
    await Promise.all(
      userId.map(async (user) => {
        //check for if don't have this user
        const member = await this.userRepository.findOne({
          where: { userId: user },
          relations: ['projectUserRole'],
        });
        if (!member) {
          throw new ForbiddenError('Do not have this user.');
        }

        //check if already has this user in project
        const currentUser = await this.projectUserRoleRepository.findOne({
          where: { user: user, project: project },
        });

        if (currentUser) {
          throw new ForbiddenError('Already have this user.');
        }

        const newMember = this.projectUserRoleRepository.create({
          user: member,
          project: project,
        });

        await this.projectUserRoleRepository.save(newMember);
      }),
    );

    return project;
  }

  //find all projectUserRole in database
  async findAll(): Promise<ProjectUserRole[]> {
    return await this.projectUserRoleRepository.find({
      relations: ['project', 'user'],
    });
  }

  //find projectUserRole with id
  async findOne(id: number): Promise<ProjectUserRole> {
    return await this.projectUserRoleRepository.findOneOrFail({
      where: { projectUserRoleid: id },
    });
  }

  //find member in this project
  async findMember(id: number): Promise<ProjectUserRole[]> {
    const member = await this.projectUserRoleRepository.find({
      where: { project: id },
      relations: ['user', 'project'],
    });

    return member;
  }

  //edit data in this projectUserRole
  async update(
    id: number,
    updateProject_user_roleInput: UpdateProjectUserRole,
  ): Promise<ProjectUserRole> {
    const project_user_role = await this.projectUserRoleRepository.findOne(id);
    const update = Object.assign(
      project_user_role,
      updateProject_user_roleInput,
    );
    return await this.projectUserRoleRepository.save(update);
  }

  //remove projectUserRole with id
  async remove(id: number): Promise<string> {
    const project_user_role = await this.projectUserRoleRepository.findOne(id);
    await this.projectUserRoleRepository.delete(id);
    return 'Delete Success';
  }

  //find project in this user
  async findByUser(id: number): Promise<ProjectUserRole[]> {
    const project = await this.projectUserRoleRepository.find({
      where: { user: id },
      relations: ['project', 'user', 'project.projectStatus'],
    });
    return project;
  }
}
