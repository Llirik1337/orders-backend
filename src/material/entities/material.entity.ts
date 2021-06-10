import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { BaseModel } from '../../_core';

export type MaterialDocument = Material & Document;

@Schema({ timestamps: true, id: true })
@ObjectType()
export class Material extends BaseModel {
  @Prop({ type: MongooseSchema.Types.String, unique: true })
  @Field(() => String)
  name: string;

  @Prop({ type: MongooseSchema.Types.Number })
  @Field(() => Float)
  length: number;

  @Prop({ type: MongooseSchema.Types.Number })
  @Field(() => Float)
  width: number;

  @Prop({ type: MongooseSchema.Types.Number, default: 0 })
  @Field(() => Float)
  cost: number;

  @Prop({ type: MongooseSchema.Types.Number })
  @Field(() => Int)
  count: number;
}

export const MaterialSchema = SchemaFactory.createForClass(Material);
