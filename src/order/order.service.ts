import { Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  create(createOrderInput: CreateOrderInput) {
    return 'This action adds a new order';
  }

  findAll(): Array<Order> {
    return [
      { id: '1', name: 'Test' },
      { id: '2', name: 'Test 2' },
    ];
  }

  findOne(id: string): Order {
    return { id, name: 'Test' };
  }

  update(id: number, updateOrderInput: UpdateOrderInput) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
