import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Project } from 'src/project/entities/project.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
} from 'typeorm';

@Entity()
@ObjectType()
export class ProjectStatus {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  projectStatusId: number;

  @Column()
  @Field()
  projectStatus: string;

  @OneToMany(() => Project, (project) => project.projectStatus, { eager: true })
  @Field(() => Project)
  project: Project[];
}
