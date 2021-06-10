import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrderStatusService } from './order-status.service';
import { OrderStatus } from './entities/order-status.entity';
import { CreateOrderStatusInput } from './dto/create-order-status.input';
import { UpdateOrderStatusInput } from './dto/update-order-status.input';
import { Operation } from '../operation/entities/operation.entity';

@Resolver(() => OrderStatus)
export class OrderStatusResolver {
  constructor(private readonly orderStatusService: OrderStatusService) {}

  @Mutation(() => OrderStatus)
  async createOrderStatus(
    @Args('createOrderStatusInput')
    createOrderStatusInput: CreateOrderStatusInput,
  ) {
    return await this.orderStatusService.create(createOrderStatusInput);
  }

  @Query(() => [OrderStatus], { name: 'ordersStatus' })
  async findAll(
    @Args('deleted', { type: () => Boolean, defaultValue: false })
    deleted: boolean,
  ) {
    return await this.orderStatusService.findAll(deleted);
  }

  @Query(() => OrderStatus, { name: 'orderStatus' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.orderStatusService.findOne(id);
  }

  @Mutation(() => OrderStatus)
  async updateOrderStatus(
    @Args('updateOrderStatusInput')
    updateOrderStatusInput: UpdateOrderStatusInput,
  ) {
    return await this.orderStatusService.update(
      updateOrderStatusInput.id,
      updateOrderStatusInput,
    );
  }

  @Mutation(() => OrderStatus)
  async recoveryOrderStatus(@Args('id', { type: () => String }) id: string) {
    return await this.orderStatusService.recovery(id);
  }

  @Mutation(() => Operation)
  async recoveryOrderStatuses(
    @Args('ids', { type: () => [String] }) ids: string[],
  ) {
    return await this.orderStatusService.recoveryList(ids);
  }

  @Mutation(() => OrderStatus)
  async forceRemoveOrderStatus(@Args('id', { type: () => String }) id: string) {
    return await this.orderStatusService.forceRemove(id);
  }

  @Mutation(() => OrderStatus)
  async removeOrderStatus(@Args('id', { type: () => String }) id: string) {
    return await this.orderStatusService.remove(id);
  }
}
