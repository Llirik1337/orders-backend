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
import { BlankMaterialModule } from './blank-material/blank-material.module';
import { OrderComponentModule } from './order-component/order-component.module';

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
    MongooseModule.forRoot(
      'mongodb+srv://Llirik1337:123@cluster0.vojcr.mongodb.net/orders?retryWrites=true&w=majority',
      {
        autoCreate: true,
        autoIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectionFactory: (connection) => {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          connection.plugin(require('mongoose-autopopulate'));
          return connection;
        },
      },
    ),
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
    BlankMaterialModule,
    OrderComponentModule,
  ],
  controllers: [],
})
export class AppModule {}
