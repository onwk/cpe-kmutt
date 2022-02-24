import { Module } from '@nestjs/common';
import { ProjectStatusService } from './project-status.service';
import { ProjectStatusResolver } from './project-status.resolver';
import { ProjectStatus } from './entities/project-status.entity';
import { Project } from 'src/project/entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectStatus])],
  providers: [ProjectStatusResolver, ProjectStatusService],
  exports: [ProjectStatusService]
})
export class ProjectStatusModule {}
