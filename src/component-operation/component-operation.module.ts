import { Module } from '@nestjs/common';
import { ComponentOperationService } from './component-operation.service';
import { ComponentOperationResolver } from './component-operation.resolver';
import { OperationModule } from 'src/operation/operation.module';
import {
  ComponentOperation,
  ComponentOperationSchema,
} from './entities/component-operation.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { MaterialModule } from 'src/material/material.module';
import { BlankMaterialModule } from 'src/blank-material/blank-material.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ComponentOperation.name, schema: ComponentOperationSchema },
    ]),
    OperationModule,
    BlankMaterialModule,
  ],
  providers: [ComponentOperationResolver, ComponentOperationService],
  exports: [ComponentOperationService],
})
export class ComponentOperationModule {}
