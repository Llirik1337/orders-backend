import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
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
  findAll() {
    return this.executorService.findAll();
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
  removeExecutor(@Args('id', { type: () => String }) id: string) {
    return this.executorService.remove(id);
  }
}
