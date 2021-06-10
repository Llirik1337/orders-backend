import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';
import { OrderService } from './order.service';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => Order)
  async createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ) {
    return await this.orderService.create(createOrderInput);
  }

  @Query(() => [Order], { name: 'orders' })
  async findAll(
    @Args('deleted', { type: () => Boolean, defaultValue: false })
    deleted: boolean,
  ) {
    return await this.orderService.findAll(deleted);
  }

  @Query(() => Order, { name: 'order' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.orderService.findOne(id);
  }

  @Mutation(() => Order)
  async updateOrder(
    @Args('updateOrderInput') updateOrderInput: UpdateOrderInput,
  ) {
    return await this.orderService.update(
      updateOrderInput.id,
      updateOrderInput,
    );
  }

  @Mutation(() => Order)
  async recoveryOrder(@Args('id', { type: () => String }) id: string) {
    return await this.orderService.recovery(id);
  }

  @Mutation(() => [Order])
  async recoveryOrders(@Args('ids', { type: () => [String] }) ids: string[]) {
    return await this.orderService.recoveryList(ids);
  }

  @Mutation(() => Order)
  async forceRemoveOrder(@Args('id', { type: () => String }) id: string) {
    return await this.orderService.forceRemove(id);
  }

  @Mutation(() => Order)
  async removeOrder(@Args('id', { type: () => String }) id: string) {
    return await this.orderService.remove(id);
  }
}
