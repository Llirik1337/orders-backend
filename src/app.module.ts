import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { OrderModule } from './order/order.module';
import { CustomerModule } from './customer/customer.module';
import { EmployeeModule } from './employee/employee.module';
import { MaterialModule } from './material/material.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    OrderModule,
    CustomerModule,
    EmployeeModule,
    MaterialModule,
  ],
})
export class AppModule {}
