import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document } from 'mongoose';
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

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Material' })
  @Field(() => Material)
  material: MaterialDocument;

  @Prop({ type: MongooseSchema.Types.Number })
  @Field(() => Float)
  length: number;

  @Prop({ type: MongooseSchema.Types.Number })
  @Field(() => Float)
  width: number;

  @Field(() => Float)
  @Prop({
    type: MongooseSchema.Types.Number,
    default: 0,
  })
  cost: number;

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