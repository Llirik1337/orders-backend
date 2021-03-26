import { Module } from '@nestjs/common';
import { OrderComponentService } from './order-component.service';
import { OrderComponentResolver } from './order-component.resolver';
import { ComponentModule } from 'src/component/component.module';
import { ComponentOperationModule } from 'src/component-operation/component-operation.module';
import {
  OrderComponent,
  OrderComponentSchema,
} from './entities/order-component.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ComponentModule,
    ComponentOperationModule,
    MongooseModule.forFeature([
      { name: OrderComponent.name, schema: OrderComponentSchema },
    ]),
  ],
  providers: [OrderComponentResolver, OrderComponentService],
  exports: [OrderComponentService],
})
export class OrderComponentModule {}
