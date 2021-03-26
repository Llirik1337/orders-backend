import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model } from 'mongoose';
import { ComponentService } from 'src/component/component.service';
import { ComponentDocument } from 'src/component/entities/component.entity';
import { CustomerService } from 'src/customer/customer.service';
import { OrderStatusService } from 'src/order-status/order-status.service';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order, OrderDocument } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    private readonly customerService: CustomerService,
    private readonly componentService: ComponentService,
    private readonly orderStatusService: OrderStatusService,
  ) {}
  async create(createOrderInput: CreateOrderInput): Promise<OrderDocument> {
    const createdOrder = new this.orderModel();
    createdOrder.name = createOrderInput.name;
    createdOrder.price = createOrderInput.price;

    const promiseComponents = [];
    for (const id of createOrderInput.componentsId) {
      promiseComponents.push(this.componentService.findOne(id));
    }

    const components = (await Promise.all(promiseComponents)) || [];

    createdOrder.components.push(...components);

    const status = await this.orderStatusService.findById(
      createOrderInput.statusId,
    );

    const customer = await this.customerService.findById(
      createOrderInput.customerId,
    );

    createdOrder.customer = customer;
    createdOrder.status = status;
    return await createdOrder.save();
  }

  async findAll() {
    return await this.orderModel
      .find()
      .populate('status')
      .populate('components')
      .populate('customer')
      .exec();
  }

  async findOne(id: string): Promise<OrderDocument> {
    return await this.orderModel.findById(id);
  }

  async update(
    id: string,
    updateOrderInput: UpdateOrderInput,
  ): Promise<OrderDocument> {
    const updatedOrder = await this.orderModel.findById(id);
    if (updateOrderInput.name) updatedOrder.name = updateOrderInput.name;
    if (updateOrderInput.price) updatedOrder.price = updateOrderInput.price;

    if (updateOrderInput?.componentsId?.length) {
      const promiseComponents = [];
      for (const id of updateOrderInput.componentsId) {
        promiseComponents.push(this.componentService.findOne(id));
      }

      const components =
        (await Promise.all<ComponentDocument>(promiseComponents)) || [];

      updatedOrder.components.push(...components);
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

    return await updatedOrder.save();
  }

  async remove(id: string): Promise<OrderDocument> {
    return await this.orderModel.findByIdAndDelete(id);
  }
}
