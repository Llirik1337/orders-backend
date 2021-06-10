import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OperationService } from './operation.service';
import { Operation } from './entities/operation.entity';
import { CreateOperationInput } from './dto/create-operation.input';
import { UpdateOperationInput } from './dto/update-operation.input';

@Resolver(() => Operation)
export class OperationResolver {
  constructor(private readonly operationService: OperationService) {}

  @Mutation(() => Operation)
  async createOperation(
    @Args('createOperationInput') createOperationInput: CreateOperationInput,
  ) {
    return await this.operationService.create(createOperationInput);
  }

  @Query(() => [Operation], { name: 'operations' })
  async findAll(
    @Args('deleted', { type: () => Boolean, defaultValue: false })
    deleted: boolean,
  ) {
    return await this.operationService.findAll(deleted);
  }

  @Query(() => Operation, { name: 'operation' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.operationService.findOne(id);
  }

  @Mutation(() => Operation)
  async updateOperation(
    @Args('updateOperationInput') updateOperationInput: UpdateOperationInput,
  ) {
    return await this.operationService.update(
      updateOperationInput.id,
      updateOperationInput,
    );
  }

  @Mutation(() => Operation)
  async recoveryOperation(@Args('id', { type: () => String }) id: string) {
    return await this.operationService.recovery(id);
  }

  @Mutation(() => [Operation])
  async recoveryOperations(
    @Args('ids', { type: () => [String] }) ids: string[],
  ) {
    return await this.operationService.recoveryList(ids);
  }

  @Mutation(() => Operation)
  async forceRemoveOperation(@Args('id', { type: () => String }) id: string) {
    return await this.operationService.forceRemove(id);
  }

  @Mutation(() => Operation)
  async removeOperation(@Args('id', { type: () => String }) id: string) {
    return await this.operationService.remove(id);
  }
}
