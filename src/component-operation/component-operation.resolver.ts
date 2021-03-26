import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
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
  findAll() {
    return this.componentOperationService.findAll();
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
  removeComponentOperation(@Args('id', { type: () => String }) id: string) {
    return this.componentOperationService.remove(id);
  }
}
