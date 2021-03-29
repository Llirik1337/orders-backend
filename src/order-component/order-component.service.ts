import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ComponentOperationService } from 'src/component-operation/component-operation.service';
import { ComponentOperationDocument } from 'src/component-operation/entities/component-operation.entity';
import { ComponentService } from 'src/component/component.service';
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
    private readonly componentOperationService: ComponentOperationService,
  ) {}
  async create(createOrderComponentInput: CreateOrderComponentInput) {
    const createdOrderComponent = new this.orderComponentModel();
    createdOrderComponent.count = createOrderComponentInput.count;

    const component = await this.componentService.findOne(
      createOrderComponentInput.componentId,
    );

    createdOrderComponent.component = component;

    const promiseBatchOperations = [];
    for (const id of createOrderComponentInput.batchOperationsId) {
      promiseBatchOperations.push(this.componentOperationService.findOne(id));
    }

    const batchOperations = await Promise.all<ComponentOperationDocument>(
      promiseBatchOperations,
    );

    createdOrderComponent.batchOperations = batchOperations;

    await createdOrderComponent.save();
    await this.updateCost(createdOrderComponent);
    return await createdOrderComponent.save();
  }

  async updateCost(orderComponent: OrderComponentDocument) {
    await orderComponent
      .populate('batchOperations')
      .populate('components')
      .execPopulate();

    const cost = orderComponent.component.cost * orderComponent.count;
    orderComponent.cost = cost;
    await orderComponent.save();
  }

  async findAll() {
    return await this.orderComponentModel
      .find()
      .populate('batchOperations')
      .populate('components')
      .lean();
  }

  async findOne(id: string) {
    return await this.orderComponentModel.findById(id);
  }

  async update(
    id: string,
    updateOrderComponentInput: UpdateOrderComponentInput,
  ) {
    const createdOrderComponent = await this.findOne(id);
    createdOrderComponent.count = updateOrderComponentInput.count;

    const component = await this.componentService.findOne(id);

    createdOrderComponent.component = component;

    const promiseBatchOperations = [];
    for (const id of updateOrderComponentInput.batchOperationsId) {
      promiseBatchOperations.push(this.componentOperationService.findOne(id));
    }

    const batchOperations = await Promise.all<ComponentOperationDocument>(
      promiseBatchOperations,
    );

    createdOrderComponent.batchOperations = batchOperations;

    await createdOrderComponent.save();
    await this.updateCost(createdOrderComponent);
    return await createdOrderComponent.save();
  }

  async remove(id: string) {
    return await this.orderComponentModel.findByIdAndRemove(id);
  }
}
