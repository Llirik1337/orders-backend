import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ExecutorService } from './executor.service';
import { Executor } from './entities/executor.entity';
import { CreateExecutorInput } from './dto/create-executor.input';
import { UpdateExecutorInput } from './dto/update-executor.input';

@Resolver(() => Executor)
export class ExecutorResolver {
  constructor(private readonly executorService: ExecutorService) {}

  @Mutation(() => Executor)
  createExecutor(
    @Args('createExecutorInput') createExecutorInput: CreateExecutorInput,
  ) {
    return this.executorService.create(createExecutorInput);
  }

  @Query(() => [Executor], { name: 'executors' })
  findAll(
    @Args('deleted', { type: () => Boolean, defaultValue: false })
    deleted: boolean,
  ) {
    return this.executorService.findAll(deleted);
  }

  @Query(() => Executor, { name: 'executor' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.executorService.findOne(id);
  }

  @Mutation(() => Executor)
  updateExecutor(
    @Args('updateExecutorInput') updateExecutorInput: UpdateExecutorInput,
  ) {
    return this.executorService.update(
      updateExecutorInput.id,
      updateExecutorInput,
    );
  }

  @Mutation(() => Executor)
  async recoveryExecutor(@Args('id', { type: () => String }) id: string) {
    return await this.executorService.recovery(id);
  }

  @Mutation(() => [Executor])
  async recoveryExecutors(
    @Args('ids', { type: () => [String] }) ids: string[],
  ) {
    return await this.executorService.recoveryList(ids);
  }

  @Mutation(() => Executor)
  async forceRemoveExecutor(@Args('id', { type: () => String }) id: string) {
    return await this.executorService.forceRemove(id);
  }

  @Mutation(() => Executor)
  removeExecutor(@Args('id', { type: () => String }) id: string) {
    return this.executorService.remove(id);
  }
}
