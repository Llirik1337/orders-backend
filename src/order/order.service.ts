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

    if (this.validateProperty(createOrderInput?.name)) {
      createdOrder.name = createOrderInput?.name;
    }

    if (this.validateProperty(createOrderInput?.notes)) {
      createdOrder.notes = createOrderInput?.notes;
    }

    if (this.validateProperty(createOrderInput?.orderComponentsId?.length)) {
      const promiseComponents = [];
      for (const id of createOrderInput.orderComponentsId) {
        promiseComponents.push(this.orderComponentService.findOne(id));
      }

      createdOrder.orderComponents =
        (await Promise.all<OrderComponentDocument>(promiseComponents)) || [];
    }

    if (this.validateProperty(createOrderInput?.statusId)) {
      createdOrder.status = await this.orderStatusService.findOne(
        createOrderInput.statusId,
      );
    }

    if (this.validateProperty(createOrderInput?.customerId)) {
      createdOrder.customer = await this.customerService.findOne(
        createOrderInput.customerId,
      );
    }

    if (this.validateProperty(createOrderInput?.executorId)) {
      createdOrder.executor = await this.executorService.findOne(
        createOrderInput.executorId,
      );
    }

    if (this.validateProperty(createOrderInput?.finishAt)) {
      createdOrder.finishAt = createOrderInput?.finishAt;
    }

    if (this.validateProperty(createOrderInput?.isFirst)) {
      createdOrder.isFirst = createOrderInput?.isFirst;
    }

    return await createdOrder.save();
  }

  async update(
    id: string,
    updateOrderInput: UpdateOrderInput,
  ): Promise<OrderDocument> {
    const updatedOrder = await this.findOne(id);

    if (this.validateProperty(updateOrderInput?.name)) {
      updatedOrder.name = updateOrderInput.name;
    }

    if (this.validateProperty(updateOrderInput?.notes)) {
      updatedOrder.notes = updateOrderInput?.notes;
    }

    if (this.validateProperty(updateOrderInput?.orderComponentsId?.length)) {
      const promiseComponents = [];
      for (const id of updateOrderInput.orderComponentsId) {
        promiseComponents.push(this.orderComponentService.findOne(id));
      }

      updatedOrder.orderComponents =
        (await Promise.all<OrderComponentDocument>(promiseComponents)) || [];
    }

    if (this.validateProperty(updateOrderInput?.statusId)) {
      updatedOrder.status = await this.orderStatusService.findOne(
        updateOrderInput.statusId,
      );
    }

    if (this.validateProperty(updateOrderInput?.customerId)) {
      updatedOrder.customer = await this.customerService.findOne(
        updateOrderInput.customerId,
      );
    }

    if (this.validateProperty(updateOrderInput?.executorId)) {
      updatedOrder.executor = await this.executorService.findOne(
        updateOrderInput.executorId,
      );
    }

    if (this.validateProperty(updateOrderInput?.finishAt)) {
      updatedOrder.finishAt = updateOrderInput.finishAt;
    }

    if (this.validateProperty(updateOrderInput?.isFirst)) {
      updatedOrder.isFirst = updateOrderInput.isFirst;
    }

    return await updatedOrder.save();
  }
}
