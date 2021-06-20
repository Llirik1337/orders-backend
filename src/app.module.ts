import { Logger, Module } from '@nestjs/common';
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql';
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
import { ExecutorModule } from './executor/executor.module';
import { DocumentsModule } from './documents/documents.module';
import { OrderComponentOperationModule } from './order-component-operation/order-component-operation.module';
import { CalculationsModule } from './calculations/calculations.module';

import * as mongooseAutopopulate from 'mongoose-autopopulate';
import * as mongooseLeanVirtual from 'mongoose-lean-virtuals';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        DATABASE_URL: Joi.string().required(),
        PORT: Joi.number().default(3000),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService?.get<string>('DATABASE_URL');
        console.log('db uri -> ', uri);
        return {
          uri,
          autoCreate: true,
          autoIndex: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          connectionFactory: (connection) => {
            connection.plugin(mongooseLeanVirtual);
            connection.plugin(mongooseAutopopulate);
            return connection;
          },
        };
      },
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const env = configService?.get<'development' | 'production'>(
          'NODE_ENV',
        );

        const commonOptions: GqlModuleOptions = {
          installSubscriptionHandlers: true,
          autoSchemaFile: 'schema.gql',
          cors: {
            origin: true,
            credentials: true,
          },
        };

        const productionOptions: GqlModuleOptions = {
          ...commonOptions,
          debug: false,
          playground: false,
        };

        const developmentOptions: GqlModuleOptions = {
          ...commonOptions,
          playground: true,
          debug: true,
        };

        return env === 'development' ? developmentOptions : productionOptions;
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
    BlankMaterialModule,
    OrderComponentModule,
    ExecutorModule,
    DocumentsModule,
    OrderComponentOperationModule,
    CalculationsModule,
  ],
  controllers: [],
})
export class AppModule {}
