import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerService } from 'src/customer/customer.service';
import { OrderComponentDocument } from 'src/order-component/entities/order-component.entity';
import { OrderComponentService } from 'src/order-component/order-component.service';
import { OrderStatusService } from 'src/order-status/order-status.service';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order, OrderDocument } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    private readonly customerService: CustomerService,
    private readonly orderComponentService: OrderComponentService,
    private readonly orderStatusService: OrderStatusService,
  ) {}
  async create(createOrderInput: CreateOrderInput): Promise<OrderDocument> {
    const createdOrder = new this.orderModel();
    createdOrder.name = createOrderInput.name;
    createdOrder.cost = createOrderInput.cost;

    const promiseComponents = [];
    for (const id of createOrderInput.componentsId) {
      promiseComponents.push(this.orderComponentService.findOne(id));
    }

    const components =
      (await Promise.all<OrderComponentDocument>(promiseComponents)) || [];

    createdOrder.components = components;

    const status = await this.orderStatusService.findById(
      createOrderInput.statusId,
    );

    const customer = await this.customerService.findById(
      createOrderInput.customerId,
    );

    createdOrder.customer = customer;
    createdOrder.status = status;
    await createdOrder.save();
    await this.updateCost(createdOrder);
    return await createdOrder.save();
  }

  async findAll() {
    return await this.orderModel
      .find()
      .populate('status')
      .populate('components')
      .populate('customer')
      .lean();
  }

  async findOne(id: string): Promise<OrderDocument> {
    return await this.orderModel.findById(id);
  }

  async updateCost(order: OrderDocument) {
    await order.populate('components').execPopulate();
    let cost = 0;
    for (const component of order.components) {
      cost += component.cost;
    }

    order.cost = cost;
    await order.save();
  }

  async update(
    id: string,
    updateOrderInput: UpdateOrderInput,
  ): Promise<OrderDocument> {
    const updatedOrder = await this.orderModel.findById(id);
    if (updateOrderInput.name) updatedOrder.name = updateOrderInput.name;
    if (updateOrderInput.cost) updatedOrder.cost = updateOrderInput.cost;

    if (updateOrderInput?.componentsId?.length) {
      const promiseComponents = [];
      for (const id of updateOrderInput.componentsId) {
        promiseComponents.push(this.orderComponentService.findOne(id));
      }

      const components =
        (await Promise.all<OrderComponentDocument>(promiseComponents)) || [];

      updatedOrder.components = components;
    }
    if (updateOrderInput.statusId) {
      const status = await this.orderStatusService.findById(
        updateOrderInput.statusId,
      );
      updatedOrder.status = status;
    }
    if (updateOrderInput.customerId) {
      const customer = await this.customerService.findById(
        updateOrderInput.customerId,
      );

      updatedOrder.customer = customer;
    }

    await updatedOrder.save();
    await this.updateCost(updatedOrder);
    return await updatedOrder.save();
  }

  async remove(id: string): Promise<OrderDocument> {
    return await this.orderModel.findByIdAndDelete(id);
  }
}
