import { Module } from '@nestjs/common';
import { ComponentService } from './component.service';
import { ComponentResolver } from './component.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Component, ComponentSchema } from './entities/component.entity';
import { OperationModule } from 'src/operation/operation.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Component.name, schema: ComponentSchema },
    ]),
    OperationModule,
  ],
  providers: [ComponentResolver, ComponentService],
  exports: [ComponentService],
})
export class ComponentModule {}
