import { Injectable, NotFoundException } from '@nestjs/common';
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
import { leanOptions } from 'src/common';

@Injectable()
export class OrderComponentOperationService {
  constructor(
    @InjectModel(OrderComponentOperation.name)
    private readonly orderComponentOperationModel: Model<OrderComponentOperationDocument>,
    private readonly employeeService: EmployeeService,
    private readonly componentOperationService: ComponentOperationService,
  ) {}

  async create(
    createOrderComponentOperationInput: CreateOrderComponentOperationInput,
  ) {
    const orderComponentOperation = new this.orderComponentOperationModel();
    if (
      createOrderComponentOperationInput.employeeId &&
      typeof createOrderComponentOperationInput.employeeId === 'string'
    ) {
      const employee = await this.employeeService.findOne(
        createOrderComponentOperationInput.employeeId,
      );

      orderComponentOperation.employee = employee;
    }

    if (
      createOrderComponentOperationInput.componentOperationId &&
      typeof createOrderComponentOperationInput.componentOperationId ===
        'string'
    ) {
      const component = await this.componentOperationService.findOne(
        createOrderComponentOperationInput.componentOperationId,
      );

      orderComponentOperation.componentOperation = component;
    }
    const result = await orderComponentOperation.save();
    return result;
    // return this.findOne()
  }

  async findAll() {
    return this.orderComponentOperationModel.find().lean(leanOptions);
  }

  async findOne(id: string) {
    const found = await this.orderComponentOperationModel.findById(id);
    if (!found)
      throw new NotFoundException({
        message: `OrderComponentOperation not found by id ${id}`,
      });
    return found;
  }

  async update(
    id: string,
    updateOrderComponentOperationInput: UpdateOrderComponentOperationInput,
  ) {
    const orderComponentOperation = await this.findOne(id);
    if (
      updateOrderComponentOperationInput.employeeId &&
      typeof updateOrderComponentOperationInput.employeeId === 'string'
    ) {
      const employee = await this.employeeService.findOne(
        updateOrderComponentOperationInput.employeeId,
      );

      orderComponentOperation.employee = employee;
    }

    if (
      updateOrderComponentOperationInput.componentOperationId &&
      typeof updateOrderComponentOperationInput.componentOperationId ===
        'string'
    ) {
      const component = await this.componentOperationService.findOne(
        updateOrderComponentOperationInput.componentOperationId,
      );

      orderComponentOperation.componentOperation = component;
    }
    const result = await orderComponentOperation.save();
    return result;
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await found.delete();
    return found;
  }
}
