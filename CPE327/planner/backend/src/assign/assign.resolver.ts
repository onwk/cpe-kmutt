import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AssignService } from './assign.service';
import { Assign } from './entities/assign.entity';
import { CreateAssignInput } from './dto/create-assign.input';
import { UpdateAssignInput } from './dto/update-assign.input';

@Resolver(() => Assign)
export class AssignResolver {
  constructor(private readonly assignService: AssignService) {}
  /**
   *
   * parameter: createAssignInput
   * returns: Created Assign
   */
  @Mutation(() => [Assign])
  newTaskMember(@Args('taskMember') createAssignInput: CreateAssignInput) {
    return this.assignService.create(createAssignInput);
  }
  /**
   * Query all assign
   * returns: all assign in database
   */
  @Query(() => [Assign], { name: 'assigns' })
  findAll() {
    return this.assignService.findAll();
  }
  /**
   *
   * parameter: id
   * returns: data in assignId
   */
  @Query(() => Assign, { name: 'assign' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.assignService.findOne(id);
  }
  /**
   *
   * parameter: updateAssignInput
   * returns: new data of assign
   */
  @Mutation(() => Assign)
  updateAssign(
    @Args('updateAssignInput') updateAssignInput: UpdateAssignInput,
  ) {
    return this.assignService.update(updateAssignInput.id, updateAssignInput);
  }

  /**
   *
   * parameter: id
   * returns: "Delete Success"
   */
  @Mutation(() => Assign)
  removeAssign(@Args('id', { type: () => Int }) id: number) {
    return this.assignService.remove(id);
  }

  /**
   *
   * parameter: id
   * returns: assigns that have a same task
   */
  @Query(() => [Assign])
  findMemberInTask(@Args('taskId', { type: () => Int }) id: number) {
    return this.assignService.findMember(id);
  }
}
