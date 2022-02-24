import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ProjectUserRoleService } from 'src/projectUserRole/projectUserRole.service';
import { Assign } from 'src/assign/entities/assign.entity';
import { ProjectUserRole } from 'src/projectUserRole/entities/projectUserRole.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Assign , ProjectUserRole])],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
