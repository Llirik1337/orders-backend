import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderStatus, OrderStatusSchema } from './entities/order-status.entity';
import { OrderStatusResolver } from './order-status.resolver';
import { OrderStatusService } from './order-status.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrderStatus.name, schema: OrderStatusSchema },
    ]),
  ],
  providers: [OrderStatusResolver, OrderStatusService],
  exports: [OrderStatusService],
})
export class OrderStatusModule {}
