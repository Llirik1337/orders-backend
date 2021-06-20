import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ComponentOperationService } from 'src/component-operation/component-operation.service';
import { EmployeeService } from 'src/employee/employee.service';
import { CreateOrderComponentOperationInput } from './dto/create-order-component-operation.input';
import { UpdateOrderComponentOperationInput } from './dto/update-order-component-operation.input';
import {
  OrderComponentOperation,
  OrderComponentOperationDocument,
} from './entities/order-component-operation.entity';
import { AbstractService } from '../_core';

@Injectable()
export class OrderComponentOperationService extends AbstractService<OrderComponentOperationDocument> {
  constructor(
    @InjectModel(OrderComponentOperation.name)
    private readonly orderComponentOperationModel: Model<OrderComponentOperationDocument>,
    private readonly employeeService: EmployeeService,
    private readonly componentOperationService: ComponentOperationService,
  ) {
    super(orderComponentOperationModel);
  }

  async create(
    createOrderComponentOperationInput: CreateOrderComponentOperationInput,
  ) {
    const orderComponentOperation = new this.orderComponentOperationModel();

    if (this.validateProperty(createOrderComponentOperationInput?.employeeId)) {
      orderComponentOperation.employee = await this.employeeService.findOne(
        createOrderComponentOperationInput.employeeId,
      );
    }

    if (
      this.validateProperty(createOrderComponentOperationInput?.componentOperationId)) {
      orderComponentOperation.componentOperation = await this.componentOperationService.findOne(
        createOrderComponentOperationInput.componentOperationId,
      );
    }

    return await orderComponentOperation.save();
  }

  async update(
    id: string,
    updateOrderComponentOperationInput: UpdateOrderComponentOperationInput,
  ) {
    const orderComponentOperation = await this.findOne(id);

    if (this.validateProperty(updateOrderComponentOperationInput?.employeeId)) {
      orderComponentOperation.employee = await this.employeeService.findOne(
        updateOrderComponentOperationInput.employeeId,
      );
    }

    if (this.validateProperty(updateOrderComponentOperationInput?.componentOperationId)) {
      orderComponentOperation.componentOperation = await this.componentOperationService.findOne(
        updateOrderComponentOperationInput.componentOperationId,
      );
    }

    return await orderComponentOperation.save();
  }
}
