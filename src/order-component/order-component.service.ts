import { Injectable, NotFoundException } from '@nestjs/common';
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

@Injectable()
export class OrderComponentService {
  constructor(
    @InjectModel(OrderComponent.name)
    private readonly orderComponentModel: Model<OrderComponentDocument>,
    private readonly componentService: ComponentService,
    private readonly orderComponentOperationService: OrderComponentOperationService,
  ) {}
  async create(createOrderComponentInput: CreateOrderComponentInput) {
    const createdOrderComponent = new this.orderComponentModel();
    createdOrderComponent.count = createOrderComponentInput.count;

    const component = await this.componentService.findOne(
      createOrderComponentInput.componentId,
    );

    createdOrderComponent.component = component;

    if (
      createOrderComponentInput.batchOperationsId &&
      typeof createOrderComponentInput.batchOperationsId === 'object' &&
      createOrderComponentInput.batchOperationsId.length
    ) {
      const promiseBatchOperations = createOrderComponentInput.batchOperationsId.map(
        (id) => this.orderComponentOperationService.findOne(id),
      );

      const batchOperations = await Promise.all(promiseBatchOperations);

      createdOrderComponent.batchOperations = batchOperations;
    }

    if (
      createOrderComponentInput.orderOperationsId &&
      typeof createOrderComponentInput.orderOperationsId === 'object' &&
      createOrderComponentInput.orderOperationsId.length
    ) {
      const promiseBatchOperations = createOrderComponentInput.orderOperationsId.map(
        (id) => this.orderComponentOperationService.findOne(id),
      );

      const orderComponentOperations = await Promise.all(
        promiseBatchOperations,
      );

      createdOrderComponent.orderComponentOperations = orderComponentOperations;
    }

    await createdOrderComponent.save();
    await this.updateCost(createdOrderComponent);
    return await createdOrderComponent.save();
  }

  async updateCost(orderComponent: OrderComponentDocument) {
    const cost = orderComponent.component.cost * orderComponent.count;
    orderComponent.cost = cost.toFixed(2);
    await orderComponent.save();
  }

  async findAll() {
    return await this.orderComponentModel.find().lean({ autopopulate: true });
  }

  async findOne(id: string) {
    const found = await this.orderComponentModel.findById(id);
    if (!found)
      throw new NotFoundException({
        message: `OrderComponent not found by id ${id}`,
      });
    return found;
  }

  async update(
    id: string,
    updateOrderComponentInput: UpdateOrderComponentInput,
  ) {
    const createdOrderComponent = await this.findOne(id);
    createdOrderComponent.count = updateOrderComponentInput.count;

    const component = await this.componentService.findOne(
      updateOrderComponentInput.componentId,
    );

    createdOrderComponent.component = component;

    if (
      updateOrderComponentInput.batchOperationsId &&
      typeof updateOrderComponentInput.batchOperationsId === 'object' &&
      updateOrderComponentInput.batchOperationsId.length
    ) {
      const promiseBatchOperations = updateOrderComponentInput.batchOperationsId.map(
        (id) => this.orderComponentOperationService.findOne(id),
      );

      const batchOperations = await Promise.all(promiseBatchOperations);

      createdOrderComponent.batchOperations = batchOperations;
    }

    if (
      updateOrderComponentInput.orderOperationsId &&
      typeof updateOrderComponentInput.orderOperationsId === 'object' &&
      updateOrderComponentInput.orderOperationsId.length
    ) {
      const promiseBatchOperations = updateOrderComponentInput.orderOperationsId.map(
        (id) => this.orderComponentOperationService.findOne(id),
      );

      const orderComponentOperations = await Promise.all(
        promiseBatchOperations,
      );

      createdOrderComponent.orderComponentOperations = orderComponentOperations;
    }

    await createdOrderComponent.save();
    await this.updateCost(createdOrderComponent);
    await createdOrderComponent.save();
    return await this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await found.delete();
    return found;
  }
}
