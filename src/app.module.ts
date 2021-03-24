import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ComponentModule } from './component/component.module';
import { CustomerModule } from './customer/customer.module';
import { EmployeeModule } from './employee/employee.module';
import { EquipmentModule } from './equipment/equipment.module';
import { MaterialModule } from './material/material.module';
import { OperationPriceModule } from './operation-price/operation-price.module';
import { OperationModule } from './operation/operation.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      cors: {
        origin: true,
        credentials: true,
      },
    }),
    OrderModule,
    CustomerModule,
    EmployeeModule,
    MaterialModule,
    UserModule,
    EquipmentModule,
    OperationPriceModule,
    OperationModule,
    ComponentModule,
  ],
  controllers: [],
})
export class AppModule {}
