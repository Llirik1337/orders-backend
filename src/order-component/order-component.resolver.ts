import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderComponentService } from './order-component.service';
import { OrderComponent } from './entities/order-component.entity';
import { CreateOrderComponentInput } from './dto/create-order-component.input';
import { UpdateOrderComponentInput } from './dto/update-order-component.input';

@Resolver(() => OrderComponent)
export class OrderComponentResolver {
  constructor(private readonly orderComponentService: OrderComponentService) {}

  @Mutation(() => OrderComponent)
  createOrderComponent(
    @Args('createOrderComponentInput')
    createOrderComponentInput: CreateOrderComponentInput,
  ) {
    return this.orderComponentService.create(createOrderComponentInput);
  }

  @Query(() => [OrderComponent], { name: 'orderComponents' })
  findAll() {
    return this.orderComponentService.findAll();
  }

  @Query(() => OrderComponent, { name: 'orderComponent' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.orderComponentService.findOne(id);
  }

  @Mutation(() => OrderComponent)
  updateOrderComponent(
    @Args('updateOrderComponentInput')
    updateOrderComponentInput: UpdateOrderComponentInput,
  ) {
    return this.orderComponentService.update(
      updateOrderComponentInput.id,
      updateOrderComponentInput,
    );
  }

  @Mutation(() => OrderComponent)
  removeOrderComponent(@Args('id', { type: () => String }) id: string) {
    return this.orderComponentService.remove(id);
  }
}
