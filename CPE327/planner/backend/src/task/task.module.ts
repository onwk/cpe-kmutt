import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import { ProjectUserRole } from 'src/projectUserRole/entities/projectUserRole.entity';
import { Assign } from 'src/assign/entities/assign.entity';
import { Project } from 'src/project/entities/project.entity';
import { TaskStatus } from 'src/task-status/entities/task-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User, ProjectUserRole, Assign, Project,TaskStatus])],
  providers: [TaskResolver, TaskService],
  exports: [TaskService],
})
export class TaskModule {}
