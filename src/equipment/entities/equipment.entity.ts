import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { BaseModel } from '../../_core';

export type EquipmentDocument = Equipment & Document;

@ObjectType()
@Schema({ timestamps: true, id: true })
export class Equipment extends BaseModel {
  @Prop({ type: MongooseSchema.Types.String, unique: true })
  @Field(() => String, { nullable: false })
  name: string;

  @Prop({ type: MongooseSchema.Types.String })
  @Field(() => String, { defaultValue: '', nullable: true })
  notes: string;

  @Prop({ type: MongooseSchema.Types.String })
  @Field(() => String, { defaultValue: '', nullable: true })
  specifications: string;

  @Prop({ type: MongooseSchema.Types.Number })
  @Field(() => Int, { defaultValue: 0, nullable: true })
  releaseYear: number;

  @Prop({ type: MongooseSchema.Types.Number })
  @Field(() => Int, { defaultValue: 0 })
  count: number;
}

export const EquipmentSchema = SchemaFactory.createForClass(Equipment);
