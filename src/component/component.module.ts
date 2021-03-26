import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComponentOperationModule } from 'src/component-operation/component-operation.module';
import { ComponentResolver } from './component.resolver';
import { ComponentService } from './component.service';
import { Component, ComponentSchema } from './entities/component.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Component.name, schema: ComponentSchema },
    ]),
    ComponentOperationModule,
  ],
  providers: [ComponentResolver, ComponentService],
  exports: [ComponentService],
})
export class ComponentModule {}
