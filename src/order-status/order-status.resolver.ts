import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderStatusService } from './order-status.service';
import { OrderStatus } from './entities/order-status.entity';
import { CreateOrderStatusInput } from './dto/create-order-status.input';
import { UpdateOrderStatusInput } from './dto/update-order-status.input';

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
  async findAll() {
    return await this.orderStatusService.findAll();
  }

  @Query(() => OrderStatus, { name: 'orderStatus' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.orderStatusService.findById(id);
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
  async removeOrderStatus(@Args('id', { type: () => String }) id: string) {
    return await this.orderStatusService.remove(id);
  }
}
