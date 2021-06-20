import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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
  findAll(
    @Args('deleted', { type: () => Boolean, defaultValue: false })
    deleted: boolean,
  ) {
    return this.orderComponentService.findAll(deleted);
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
  async recoveryOrderComponent(@Args('id', { type: () => String }) id: string) {
    return await this.orderComponentService.recovery(id);
  }

  @Mutation(() => [OrderComponent])
  async recoveryOrderComponents(
    @Args('ids', { type: () => [String] }) ids: string[],
  ) {
    return await this.orderComponentService.recoveryList(ids);
  }

  @Mutation(() => OrderComponent)
  async forceRemoveOrderComponent(
    @Args('id', { type: () => String }) id: string,
  ) {
    return await this.orderComponentService.forceRemove(id);
  }

  @Mutation(() => OrderComponent)
  removeOrderComponent(@Args('id', { type: () => String }) id: string) {
    return this.orderComponentService.remove(id);
  }
}
