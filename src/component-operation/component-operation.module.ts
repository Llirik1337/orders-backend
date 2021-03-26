import { Module } from '@nestjs/common';
import { ComponentOperationService } from './component-operation.service';
import { ComponentOperationResolver } from './component-operation.resolver';
import { OperationModule } from 'src/operation/operation.module';
import {
  ComponentOperation,
  ComponentOperationSchema,
} from './entities/component-operation.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ComponentOperation.name, schema: ComponentOperationSchema },
    ]),
    OperationModule,
  ],
  providers: [ComponentOperationResolver, ComponentOperationService],
  exports: [ComponentOperationService],
})
export class ComponentOperationModule {}
