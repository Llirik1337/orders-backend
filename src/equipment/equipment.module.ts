import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentResolver } from './equipment.resolver';
import { Equipment, EquipmentSchema } from './entities/equipment.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Equipment.name, schema: EquipmentSchema },
    ]),
  ],
  providers: [EquipmentResolver, EquipmentService],
  exports: [EquipmentService],
})
export class EquipmentModule {}
