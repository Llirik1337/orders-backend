import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model } from 'mongoose';
import { CreateOrderStatusInput } from './dto/create-order-status.input';
import { UpdateOrderStatusInput } from './dto/update-order-status.input';

import {
  OrderStatus,
  OrderStatusDocument,
} from './entities/order-status.entity';

@Injectable()
export class OrderStatusService {
  constructor(
    @InjectModel(OrderStatus.name)
    private orderStatusModel: Model<OrderStatusDocument>,
  ) {}

  async create(
    createOrderStatusInput: CreateOrderStatusInput,
  ): Promise<OrderStatusDocument> {
    const createdOrderStatus = new this.orderStatusModel();
    createdOrderStatus.name = createOrderStatusInput.name;
    return await createdOrderStatus.save();
  }

  async findAll() {
    return await this.orderStatusModel.find().lean({ autopopulate: true });
  }

  async findOne(id: string): Promise<OrderStatusDocument> {
    const found = await this.orderStatusModel.findById(id);
    if (!found)
      throw new NotFoundException({
        message: `OrderStatus not found by id ${id}`,
      });
    return found;
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

  async remove(id: string): Promise<OrderStatusDocument> {
    const found = await this.findOne(id);
    await found.delete();
    return found;
  }
}
