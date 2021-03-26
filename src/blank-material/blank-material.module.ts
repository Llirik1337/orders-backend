import { Module } from '@nestjs/common';
import { BlankMaterialService } from './blank-material.service';
import { BlankMaterialResolver } from './blank-material.resolver';
import {
  BlankMaterial,
  BlankMaterialSchema,
} from './entities/blank-material.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { MaterialModule } from 'src/material/material.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlankMaterial.name, schema: BlankMaterialSchema },
    ]),
    MaterialModule,
  ],
  providers: [BlankMaterialResolver, BlankMaterialService],
  exports: [BlankMaterialService],
})
export class BlankMaterialModule {}
