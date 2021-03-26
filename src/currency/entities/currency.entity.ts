import { Field, Int, Float, ObjectType } from '@nestjs/graphql';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
export type CurrencyDocument = Currency & Document;
@ObjectType()
@Schema({ timestamps: true, id: true })
export class Currency {
  @Field(() => String)
  _id: string;

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

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
export const CurrencySchema = SchemaFactory.createForClass(Currency);
