import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ComponentModule } from './component/component.module';
import { CustomerModule } from './customer/customer.module';
import { EmployeeModule } from './employee/employee.module';
import { EquipmentModule } from './equipment/equipment.module';
import { MaterialModule } from './material/material.module';
import { OperationModule } from './operation/operation.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { OrderStatusModule } from './order-status/order-status.module';
import { CurrencyModule } from './currency/currency.module';
import { PositionsModule } from './positions/positions.module';

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
    MongooseModule.forRoot('mongodb://localhost/orders', {
      autoCreate: true,
      autoIndex: true,
      autoReconnect: true,
      logger: console.log,
      connectionFactory: (connection) => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        connection.plugin(require('mongoose-autopopulate'));
        return connection;
      },
    }),
    OrderModule,
    CustomerModule,
    EmployeeModule,
    MaterialModule,
    UserModule,
    EquipmentModule,
    OperationModule,
    ComponentModule,
    OrderStatusModule,
    CurrencyModule,
    PositionsModule,
  ],
  controllers: [],
})
export class AppModule {}
