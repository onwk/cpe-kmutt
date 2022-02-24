import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Project } from './entities/project.entity';
import { ProjectUserRole } from 'src/projectUserRole/entities/projectUserRole.entity';
import { User } from 'src/user/entities/user.entity';
import { Task } from 'src/task/entities/task.entity';
import { ProjectStatus } from 'src/project-status/entities/project-status.entity';
import { ProjectUserRoleService } from 'src/projectUserRole/projectUserRole.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectUserRole, User,Task,ProjectStatus])],
  providers: [ProjectResolver, ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
