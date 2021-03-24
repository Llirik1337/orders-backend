import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OperationService } from './operation.service';
import { Operation } from './entities/operation.entity';
import { CreateOperationInput } from './dto/create-operation.input';
import { UpdateOperationInput } from './dto/update-operation.input';

@Resolver(() => Operation)
export class OperationResolver {
  constructor(private readonly operationService: OperationService) {}

  @Mutation(() => Operation)
  createOperation(@Args('createOperationInput') createOperationInput: CreateOperationInput) {
    return this.operationService.create(createOperationInput);
  }

  @Query(() => [Operation], { name: 'operation' })
  findAll() {
    return this.operationService.findAll();
  }

  @Query(() => Operation, { name: 'operation' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.operationService.findOne(id);
  }

  @Mutation(() => Operation)
  updateOperation(@Args('updateOperationInput') updateOperationInput: UpdateOperationInput) {
    return this.operationService.update(updateOperationInput.id, updateOperationInput);
  }

  @Mutation(() => Operation)
  removeOperation(@Args('id', { type: () => Int }) id: number) {
    return this.operationService.remove(id);
  }
}
