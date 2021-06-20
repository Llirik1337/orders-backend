import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { BaseModel } from '../../_core';

export type CurrencyDocument = Currency & Document;

@ObjectType()
@Schema({ timestamps: true, id: true })
export class Currency extends BaseModel {
  @Prop({ type: MongooseSchema.Types.String, required: true })
  @Field(() => String, { nullable: false })
  NumCode: string;

  @Field(() => String, { nullable: false })
  @Prop({ type: MongooseSchema.Types.String, required: true })
  CharCode: string;

  @Field(() => Int, { nullable: false })
  @Prop({ type: MongooseSchema.Types.Number, required: true })
  Nominal: number;

  @Field(() => String, { nullable: false })
  @Prop({ type: MongooseSchema.Types.String, required: true })
  Name: string;

  @Field(() => Float, { nullable: false })
  @Prop({ type: MongooseSchema.Types.Number, required: true })
  Value: number;
}

export const CurrencySchema = SchemaFactory.createForClass(Currency);
