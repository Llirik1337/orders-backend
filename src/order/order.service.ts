import { Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';

// const orders: Order[] = [];

// // Да сука обычный for. ВО - первых нахуй иди, один тут работаю за двоих,
// // а во - вторых, хули ты мне сделаешь, в третьих за мат извини
// for (let i = 1; i <= 60; ++i) {
//   orders.push({
//     id: i,
//     name: `Наименование ${i}`,
//     customer: customers[0],
//     status: OrderStatus.CREATE,
//   });
// }

// let maxIdOrders = 60;

@Injectable()
export class OrderService {
  create(createOrderInput: CreateOrderInput) {
    return 'This action adds a new order';
  }

  findAll(): Array<Order> {
    return [];
    // return orders;
  }

  findOne(id: string) {
    return ' ';
  }

  update(id: number, updateOrderInput: UpdateOrderInput) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
