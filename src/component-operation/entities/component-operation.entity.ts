import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import {
  BlankMaterial,
  BlankMaterialDocument,
} from 'src/blank-material/entities/blank-material.entity';
import { round } from 'src/_core/common';
import { Equipment } from 'src/equipment/entities/equipment.entity';
import {
  Executor,
  ExecutorDocument,
} from 'src/executor/entities/executor.entity';
import {
  Operation,
  OperationDocument,
} from 'src/operation/entities/operation.entity';
import { BaseModel } from '../../_core';

export type ComponentOperationDocument = ComponentOperation & Document;

@Schema()
@ObjectType()
export class ComponentOperation extends BaseModel {
  @Prop({ type: MongooseSchema.Types.Number })
  @Field(() => Float, { nullable: true })
  time: number;

  @Field(() => Float)
  cost: number;

  @Field(() => Float)
  fot: number;

  @Field(() => Float)
  materialCost: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Operation',
    autopopulate: true,
    required: false,
  })
  @Field(() => Operation, { nullable: true })
  operation: OperationDocument;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Executor',
    autopopulate: true,
    required: false,
  })
  @Field(() => Executor, { nullable: true })
  executor: ExecutorDocument;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Equipment',
    autopopulate: true,
    required: false,
  })
  @Field(() => Equipment, { nullable: true })
  equipment: Equipment;

  @Prop({
    type: [
      {
        type: MongooseSchema.Types.ObjectId,
        ref: 'BlankMaterial',
        required: true,
        autopopulate: true,
      },
    ],
    default: [],
  })
  @Field(() => [BlankMaterial], { nullable: true })
  blankMaterials: BlankMaterialDocument[];
}

export const ComponentOperationSchema = SchemaFactory.createForClass(
  ComponentOperation,
);

const cost = ComponentOperationSchema.virtual('cost');
cost.get(function (this: ComponentOperation) {
  let cost = 0;

  cost += this.materialCost;
  cost += this.fot;

  return round(cost, 2);
});

const fot = ComponentOperationSchema.virtual('fot');
fot.get(function (this: ComponentOperation) {
  let fot = 0;

  if (this.operation?.price) {
    const time = this?.time ?? 1;
    const resultOperationCost = this.operation?.price * time;
    fot += round(resultOperationCost, 2);
  }

  return round(fot, 2);
});

const materialCost = ComponentOperationSchema.virtual('materialCost');
materialCost.get(function (this: ComponentOperation) {
  let materialCost = 0;

  for (const blankMaterial of this.blankMaterials) {
    if (blankMaterial?.cost) materialCost += round(blankMaterial.cost, 2);
  }

  return round(materialCost, 2);
});
