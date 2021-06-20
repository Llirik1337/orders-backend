import { ExecutorService } from '../executor/executor.service';
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
import { AbstractService } from '../_core';

@Injectable()
export class OrderService extends AbstractService<OrderDocument> {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    private readonly customerService: CustomerService,
    private readonly executorService: ExecutorService,
    private readonly orderComponentService: OrderComponentService,
    private readonly orderStatusService: OrderStatusService,
  ) {
    super(orderModel);
  }

  async create(createOrderInput: CreateOrderInput): Promise<OrderDocument> {
    const createdOrder = new this.orderModel();

    createdOrder.name = createOrderInput?.name;

    createdOrder.notes = createOrderInput?.notes;

    const promiseComponents = [];
    for (const id of createOrderInput.orderComponentsId) {
      promiseComponents.push(this.orderComponentService.findOne(id));
    }

    createdOrder.orderComponents =
      (await Promise.all<OrderComponentDocument>(promiseComponents)) || [];

    const status = await this.orderStatusService.findOne(
      createOrderInput.statusId,
    );

    const customer = await this.customerService.findOne(
      createOrderInput.customerId,
    );

    if (createOrderInput?.executorId) {
      const executor = await this.executorService.findOne(
        createOrderInput.executorId,
      );

      if (executor) createdOrder.executor = executor;
    }

    createdOrder.customer = customer;
    createdOrder.status = status;

    await createdOrder.save();
    return await createdOrder.save();
  }

  async update(
    id: string,
    updateOrderInput: UpdateOrderInput,
  ): Promise<OrderDocument> {
    const updatedOrder = await this.findOne(id);

    if (updateOrderInput?.name) updatedOrder.name = updateOrderInput.name;

    if (updateOrderInput?.notes) updatedOrder.notes = updateOrderInput?.notes;

    if (updateOrderInput?.orderComponentsId?.length) {
      const promiseComponents = [];
      for (const id of updateOrderInput.orderComponentsId) {
        promiseComponents.push(this.orderComponentService.findOne(id));
      }

      updatedOrder.orderComponents =
        (await Promise.all<OrderComponentDocument>(promiseComponents)) || [];
    }

    if (updateOrderInput?.statusId) {
      updatedOrder.status = await this.orderStatusService.findOne(
        updateOrderInput.statusId,
      );
    }

    if (updateOrderInput?.customerId) {
      updatedOrder.customer = await this.customerService.findOne(
        updateOrderInput.customerId,
      );
    }

    if (updateOrderInput?.executorId) {
      updatedOrder.executor = await this.executorService.findOne(
        updateOrderInput.executorId,
      );
    }

    await updatedOrder.save();
    return await updatedOrder.save();
  }
}
