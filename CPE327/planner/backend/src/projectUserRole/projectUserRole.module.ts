import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';
import { ProjectService } from 'src/project/project.service';
import { User } from 'src/user/entities/user.entity';
import { ProjectUserRole } from './entities/projectUserRole.entity';
import { projectUserRoleResvoler } from './projectUserRole.resolver';
import { ProjectUserRoleService } from './projectUserRole.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectUserRole,User,Project])],
  providers: [projectUserRoleResvoler, ProjectUserRoleService],
  exports: [ProjectUserRoleService],
})
export class ProjectUserRoleModule {}
