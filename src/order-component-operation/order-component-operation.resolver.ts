import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrderComponentOperationService } from './order-component-operation.service';
import { OrderComponentOperation } from './entities/order-component-operation.entity';
import { CreateOrderComponentOperationInput } from './dto/create-order-component-operation.input';
import { UpdateOrderComponentOperationInput } from './dto/update-order-component-operation.input';

@Resolver(() => OrderComponentOperation)
export class OrderComponentOperationResolver {
  constructor(
    private readonly orderComponentOperationService: OrderComponentOperationService,
  ) {}

  @Mutation(() => OrderComponentOperation)
  createOrderComponentOperation(
    @Args('createOrderComponentOperationInput')
    createOrderComponentOperationInput: CreateOrderComponentOperationInput,
  ) {
    return this.orderComponentOperationService.create(
      createOrderComponentOperationInput,
    );
  }

  @Query(() => [OrderComponentOperation], { name: 'orderComponentOperation' })
  findAll() {
    return this.orderComponentOperationService.findAll();
  }

  @Query(() => OrderComponentOperation, { name: 'orderComponentOperation' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.orderComponentOperationService.findOne(id);
  }

  @Mutation(() => OrderComponentOperation)
  updateOrderComponentOperation(
    @Args('updateOrderComponentOperationInput')
    updateOrderComponentOperationInput: UpdateOrderComponentOperationInput,
  ) {
    return this.orderComponentOperationService.update(
      updateOrderComponentOperationInput.id,
      updateOrderComponentOperationInput,
    );
  }

  @Mutation(() => OrderComponentOperation)
  removeOrderComponentOperation(
    @Args('id', { type: () => String }) id: string,
  ) {
    return this.orderComponentOperationService.remove(id);
  }
}
