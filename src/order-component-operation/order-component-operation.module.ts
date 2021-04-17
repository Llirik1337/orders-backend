import { Module } from '@nestjs/common';
import { OrderComponentOperationService } from './order-component-operation.service';
import { OrderComponentOperationResolver } from './order-component-operation.resolver';
import { EmployeeModule } from 'src/employee/employee.module';
import { ComponentOperationModule } from 'src/component-operation/component-operation.module';
import {
  OrderComponentOperation,
  OrderComponentOperationSchema,
} from './entities/order-component-operation.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OrderComponentOperation.name,
        schema: OrderComponentOperationSchema,
      },
    ]),
    EmployeeModule,
    ComponentOperationModule,
  ],
  providers: [OrderComponentOperationResolver, OrderComponentOperationService],
  exports: [OrderComponentOperationService],
})
export class OrderComponentOperationModule {}
