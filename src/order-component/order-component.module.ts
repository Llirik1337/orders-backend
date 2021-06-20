import { Module } from '@nestjs/common';
import { OrderComponentService } from './order-component.service';
import { OrderComponentResolver } from './order-component.resolver';
import { ComponentModule } from 'src/component/component.module';
import {
  OrderComponent,
  OrderComponentSchema,
} from './entities/order-component.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderComponentOperationModule } from 'src/order-component-operation/order-component-operation.module';

@Module({
  imports: [
    ComponentModule,
    OrderComponentOperationModule,
    MongooseModule.forFeature([
      { name: OrderComponent.name, schema: OrderComponentSchema },
    ]),
  ],
  providers: [OrderComponentResolver, OrderComponentService],
  exports: [OrderComponentService],
})
export class OrderComponentModule {}
