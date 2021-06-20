import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ComponentService } from 'src/component/component.service';
import { OrderComponentOperationService } from 'src/order-component-operation/order-component-operation.service';
import { CreateOrderComponentInput } from './dto/create-order-component.input';
import { UpdateOrderComponentInput } from './dto/update-order-component.input';
import {
  OrderComponent,
  OrderComponentDocument,
} from './entities/order-component.entity';
import { AbstractService } from '../_core';

@Injectable()
export class OrderComponentService extends AbstractService<OrderComponentDocument> {
  constructor(
    @InjectModel(OrderComponent.name)
    private readonly orderComponentModel: Model<OrderComponentDocument>,
    private readonly componentService: ComponentService,
    private readonly orderComponentOperationService: OrderComponentOperationService,
  ) {
    super(orderComponentModel);
  }

  async create(createOrderComponentInput: CreateOrderComponentInput) {
    const createdOrderComponent = new this.orderComponentModel();

    if (this.validateProperty(createOrderComponentInput?.count)) {
      createdOrderComponent.count = createOrderComponentInput.count;
    }

    if (this.validateProperty(createOrderComponentInput?.componentId)) {
      createdOrderComponent.component = await this.componentService.findOne(
        createOrderComponentInput.componentId,
      );
    }

    if (
      this.validateProperty(createOrderComponentInput?.batchOperationsId) &&
      typeof createOrderComponentInput?.batchOperationsId === 'object' &&
      createOrderComponentInput?.batchOperationsId?.length > 0
    ) {
      const promiseBatchOperations = createOrderComponentInput.batchOperationsId.map(
        (id) => this.orderComponentOperationService.findOne(id),
      );

      createdOrderComponent.batchOperations = await Promise.all(
        promiseBatchOperations,
      );
    }

    if (
      this.validateProperty(createOrderComponentInput?.orderOperationsId) &&
      typeof createOrderComponentInput?.orderOperationsId === 'object' &&
      createOrderComponentInput?.orderOperationsId?.length > 0
    ) {
      const promiseBatchOperations = createOrderComponentInput.orderOperationsId.map(
        (id) => this.orderComponentOperationService.findOne(id),
      );

      createdOrderComponent.orderComponentOperations = await Promise.all(
        promiseBatchOperations,
      );
    }

    return await createdOrderComponent.save();
  }

  async update(
    id: string,
    updateOrderComponentInput: UpdateOrderComponentInput,
  ) {
    const createdOrderComponent = await this.findOne(id);

    if (this.validateProperty(updateOrderComponentInput?.count)) {
      createdOrderComponent.count = updateOrderComponentInput.count;
    }

    if (this.validateProperty(updateOrderComponentInput?.componentId)) {
      createdOrderComponent.component = await this.componentService.findOne(
        updateOrderComponentInput.componentId,
      );
    }

    if (this.validateProperty(updateOrderComponentInput?.batchOperationsId)) {
      const promiseBatchOperations = updateOrderComponentInput.batchOperationsId.map(
        (id) => this.orderComponentOperationService.findOne(id),
      );

      createdOrderComponent.batchOperations = await Promise.all(
        promiseBatchOperations,
      );
    }

    if (this.validateProperty(updateOrderComponentInput?.orderOperationsId)) {
      const promiseBatchOperations = updateOrderComponentInput.orderOperationsId.map(
        (id) => this.orderComponentOperationService.findOne(id),
      );

      createdOrderComponent.orderComponentOperations = await Promise.all(
        promiseBatchOperations,
      );
    }

    return await createdOrderComponent.save();
  }
}
