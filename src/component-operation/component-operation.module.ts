import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlankMaterialModule } from 'src/blank-material/blank-material.module';
import { EquipmentModule } from 'src/equipment/equipment.module';
import { OperationModule } from 'src/operation/operation.module';
import { ComponentOperationResolver } from './component-operation.resolver';
import { ComponentOperationService } from './component-operation.service';
import {
  ComponentOperation,
  ComponentOperationSchema,
} from './entities/component-operation.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ComponentOperation.name, schema: ComponentOperationSchema },
    ]),
    OperationModule,
    EquipmentModule,
    BlankMaterialModule,
  ],
  providers: [ComponentOperationResolver, ComponentOperationService],
  exports: [ComponentOperationService],
})
export class ComponentOperationModule {}
