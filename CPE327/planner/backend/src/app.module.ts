import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
// import { MyprojectModule } from './myproject/myproject.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { AssignModule } from './assign/assign.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import graphql_config from './config/graphql.config';
import typeorm_config from './config/orm.config';
import { AuthModule } from './auth/auth.module';
import { ProjectUserRoleModule } from './projectUserRole/projectUserRole.module';
import { TaskStatusModule } from './task-status/task-status.module';
import { ProjectStatusModule } from './project-status/project-status.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    GraphQLModule.forRoot(graphql_config),
    TypeOrmModule.forRoot(typeorm_config),
    ProjectModule,
    ProjectUserRoleModule,
    UserModule,
    TaskModule,
    AssignModule,
    AuthModule,
    TaskStatusModule,
    ProjectStatusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
