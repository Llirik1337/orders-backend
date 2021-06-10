import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderStatusInput } from './dto/create-order-status.input';
import { UpdateOrderStatusInput } from './dto/update-order-status.input';

import {
  OrderStatus,
  OrderStatusDocument,
} from './entities/order-status.entity';
import { AbstractService } from '../_core';

@Injectable()
export class OrderStatusService extends AbstractService<OrderStatusDocument> {
  constructor(
    @InjectModel(OrderStatus.name)
    private orderStatusModel: Model<OrderStatusDocument>,
  ) {
    super(orderStatusModel);
  }

  async create(
    createOrderStatusInput: CreateOrderStatusInput,
  ): Promise<OrderStatusDocument> {
    const createdOrderStatus = new this.orderStatusModel();
    createdOrderStatus.name = createOrderStatusInput.name;
    return await createdOrderStatus.save();
  }

  async update(
    id: string,
    updateOrderStatusInput: UpdateOrderStatusInput,
  ): Promise<OrderStatusDocument> {
    const found = await this.findOne(id);

    if (updateOrderStatusInput.name) found.name = updateOrderStatusInput.name;

    await found.save();

    return await this.findOne(id);
  }
}
