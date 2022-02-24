import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Assign } from 'src/assign/entities/assign.entity';
import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

export enum Role {
  MANAGER = 'manager',
  EMPLOYEE = 'employee',
}

registerEnumType(Role, {
  name: 'Role',
});

@Entity()
@ObjectType()
export class ProjectUserRole {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  projectUserRoleid: number;

  @ManyToOne(() => User, (user) => user.projectUserRole, {
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User; 

  @ManyToOne(() => Project, (project) => project.projectUserRole, {
    onDelete: 'CASCADE',
  })
  @Field(() => Project)
  project: Project;
  
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.EMPLOYEE,
  })
  @Field(() => Role)
  role: Role;

  @CreateDateColumn()
  @Field()
  created_at: Date;

  @UpdateDateColumn()
  @Field()
  updated_at: Date;
}
