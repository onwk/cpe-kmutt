import { Module } from '@nestjs/common';
import { TaskStatusService } from './task-status.service';
import { TaskStatusResolver } from './task-status.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';
import { TaskStatus } from './entities/task-status.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Task,TaskStatus])],
  providers: [TaskStatusResolver, TaskStatusService],
  exports: [TaskStatusService],     
})
export class TaskStatusModule {}
