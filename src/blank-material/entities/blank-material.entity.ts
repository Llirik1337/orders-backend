import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document } from 'mongoose';
import { round } from 'src/common';
import {
  Material,
  MaterialDocument,
} from 'src/material/entities/material.entity';

export type BlankMaterialDocument = BlankMaterial & Document;

@ObjectType()
@Schema({ timestamps: true })
export class BlankMaterial {
  @Field(() => String)
  _id: string;

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

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
export const BlankMaterialSchema = SchemaFactory.createForClass(BlankMaterial);

const cost = BlankMaterialSchema.virtual('cost');
cost.get(function (this: BlankMaterial) {
  return round(this.diff * this.material.cost, 2);
});

const name = BlankMaterialSchema.virtual('name');
name.get(function (this: BlankMaterial) {
  const size = `(${this.width}mm x ${this.length}mm)`;
  return `${size} ${this.material.name}`;
});
