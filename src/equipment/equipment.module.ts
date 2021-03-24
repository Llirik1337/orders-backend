import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentResolver } from './equipment.resolver';

@Module({
  providers: [EquipmentResolver, EquipmentService]
})
export class EquipmentModule {}
