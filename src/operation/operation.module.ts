import { Module } from '@nestjs/common';
import { OperationService } from './operation.service';
import { OperationResolver } from './operation.resolver';
import { Operation, OperationSchema } from './entities/operation.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { MaterialModule } from 'src/material/material.module';
import { EquipmentModule } from 'src/equipment/equipment.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Operation.name, schema: OperationSchema },
    ]),
    MaterialModule,
    EquipmentModule,
  ],
  providers: [OperationResolver, OperationService],
  exports: [OperationService],
})
export class OperationModule {}
