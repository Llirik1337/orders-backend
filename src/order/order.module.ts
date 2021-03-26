import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModule } from 'src/customer/customer.module';
import { OrderComponentModule } from 'src/order-component/order-component.module';
import { OrderStatusModule } from 'src/order-status/order-status.module';
import { Order, OrderSchema } from './entities/order.entity';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    CustomerModule,
    OrderComponentModule,
    OrderStatusModule,
  ],
  providers: [OrderResolver, OrderService],
  exports: [OrderService],
})
export class OrderModule {}
