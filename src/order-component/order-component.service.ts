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
    createdOrderComponent.count = createOrderComponentInput.count;

    createdOrderComponent.component = await this.componentService.findOne(
      createOrderComponentInput.componentId,
    );

    if (
      createOrderComponentInput.batchOperationsId &&
      typeof createOrderComponentInput.batchOperationsId === 'object' &&
      createOrderComponentInput.batchOperationsId.length
    ) {
      const promiseBatchOperations = createOrderComponentInput.batchOperationsId.map(
        (id) => this.orderComponentOperationService.findOne(id),
      );

      createdOrderComponent.batchOperations = await Promise.all(
        promiseBatchOperations,
      );
    }

    if (
      createOrderComponentInput.orderOperationsId &&
      typeof createOrderComponentInput.orderOperationsId === 'object' &&
      createOrderComponentInput.orderOperationsId.length
    ) {
      const promiseBatchOperations = createOrderComponentInput.orderOperationsId.map(
        (id) => this.orderComponentOperationService.findOne(id),
      );

      createdOrderComponent.orderComponentOperations = await Promise.all(
        promiseBatchOperations,
      );
    }

    await createdOrderComponent.save();
    return createdOrderComponent;
  }

  async update(
    id: string,
    updateOrderComponentInput: UpdateOrderComponentInput,
  ) {
    const createdOrderComponent = await this.findOne(id);
    createdOrderComponent.count = updateOrderComponentInput.count;

    createdOrderComponent.component = await this.componentService.findOne(
      updateOrderComponentInput.componentId,
    );

    if (
      updateOrderComponentInput.batchOperationsId &&
      typeof updateOrderComponentInput.batchOperationsId === 'object' &&
      updateOrderComponentInput.batchOperationsId.length
    ) {
      const promiseBatchOperations = updateOrderComponentInput.batchOperationsId.map(
        (id) => this.orderComponentOperationService.findOne(id),
      );

      createdOrderComponent.batchOperations = await Promise.all(
        promiseBatchOperations,
      );
    }

    if (
      updateOrderComponentInput.orderOperationsId &&
      typeof updateOrderComponentInput.orderOperationsId === 'object' &&
      updateOrderComponentInput.orderOperationsId.length
    ) {
      const promiseBatchOperations = updateOrderComponentInput.orderOperationsId.map(
        (id) => this.orderComponentOperationService.findOne(id),
      );

      createdOrderComponent.orderComponentOperations = await Promise.all(
        promiseBatchOperations,
      );
    }

    await createdOrderComponent.save();
    return await this.findOne(id);
  }
}
