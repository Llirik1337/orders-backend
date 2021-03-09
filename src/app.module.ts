import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { OrderModule } from './order/order.module';
import { CustomerModule } from './customer/customer.module';
import { EmployeeModule } from './employee/employee.module';
import { MaterialModule } from './material/material.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './controllers/app.controller';

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
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
