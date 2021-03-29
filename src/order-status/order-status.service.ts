import { Injectable } from '@nestjs/common';
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
    return await this.orderStatusModel.find().exec();
  }

  async findById(id: string): Promise<OrderStatusDocument> {
    return await this.orderStatusModel.findById(id);
  }

  async update(
    id: string,
    updateOrderStatusInput: UpdateOrderStatusInput,
  ): Promise<OrderStatusDocument> {
    return await this.orderStatusModel.findByIdAndUpdate(
      id,
      updateOrderStatusInput,
    );
  }

  async remove(id: string): Promise<OrderStatusDocument> {
    return await this.orderStatusModel.findByIdAndRemove(id);
  }
}
