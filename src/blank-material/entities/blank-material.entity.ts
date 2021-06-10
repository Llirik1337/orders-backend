import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { round } from 'src/_core/common';
import {
  Material,
  MaterialDocument,
} from 'src/material/entities/material.entity';
import { BaseModel } from '../../_core';

export type BlankMaterialDocument = BlankMaterial & Document;

@ObjectType()
@Schema({ timestamps: true })
export class BlankMaterial extends BaseModel {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Material',
    autopopulate: true,
  })
  @Field(() => Material)
  material: MaterialDocument;

  @Prop({ type: MongooseSchema.Types.Number })
  @Field(() => Float)
  length: number;

  @Prop({ type: MongooseSchema.Types.Number })
  @Field(() => Float)
  width: number;

  @Field(() => Float)
  cost: number;

  @Field(() => String)
  name: string;

  @Field(() => Float)
  @Prop({
    type: MongooseSchema.Types.Number,
    default: 0,
  })
  diff: number;
}

export const BlankMaterialSchema = SchemaFactory.createForClass(BlankMaterial);

const cost = BlankMaterialSchema.virtual('cost');
cost.get(function (this: BlankMaterial) {
  return round(this.diff * this.material.cost, 2);
});

const name = BlankMaterialSchema.virtual('name');
name.get(function (this: BlankMaterial) {
  const size = `(${this.length}x${this.width})`;
  return `${size} ${this.material.name}`;
});
