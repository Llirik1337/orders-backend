import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ComponentOperationService } from './component-operation.service';
import { ComponentOperation } from './entities/component-operation.entity';
import { CreateComponentOperationInput } from './dto/create-component-operation.input';
import { UpdateComponentOperationInput } from './dto/update-component-operation.input';

@Resolver(() => ComponentOperation)
export class ComponentOperationResolver {
  constructor(
    private readonly componentOperationService: ComponentOperationService,
  ) {}

  @Mutation(() => ComponentOperation)
  createComponentOperation(
    @Args('createComponentOperationInput')
    createComponentOperationInput: CreateComponentOperationInput,
  ) {
    return this.componentOperationService.create(createComponentOperationInput);
  }

  @Query(() => [ComponentOperation], { name: 'componentOperations' })
  findAll(
    @Args('deleted', { type: () => Boolean, defaultValue: false })
    deleted: boolean,
  ) {
    return this.componentOperationService.findAll(deleted);
  }

  @Query(() => ComponentOperation, { name: 'componentOperation' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.componentOperationService.findOne(id);
  }

  @Mutation(() => ComponentOperation)
  updateComponentOperation(
    @Args('updateComponentOperationInput')
    updateComponentOperationInput: UpdateComponentOperationInput,
  ) {
    return this.componentOperationService.update(
      updateComponentOperationInput.id,
      updateComponentOperationInput,
    );
  }

  @Mutation(() => ComponentOperation)
  async recoveryComponentOperation(
    @Args('id', { type: () => String }) id: string,
  ) {
    return await this.componentOperationService.recovery(id);
  }

  @Mutation(() => [ComponentOperation])
  async recoveryComponentOperations(
    @Args('ids', { type: () => [String] }) ids: string[],
  ) {
    return await this.componentOperationService.recoveryList(ids);
  }

  @Mutation(() => ComponentOperation)
  async forceRemoveComponentOperation(
    @Args('id', { type: () => String }) id: string,
  ) {
    return await this.componentOperationService.forceRemove(id);
  }

  @Mutation(() => ComponentOperation)
  removeComponentOperation(@Args('id', { type: () => String }) id: string) {
    return this.componentOperationService.remove(id);
  }
}
