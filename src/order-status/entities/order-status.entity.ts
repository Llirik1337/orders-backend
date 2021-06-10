import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { BaseModel } from '../../_core';

export type OrderStatusDocument = OrderStatus & Document;

@ObjectType()
@Schema({ timestamps: true, id: true })
export class OrderStatus extends BaseModel {
  @Prop({ require: true, type: MongooseSchema.Types.String, unique: true })
  @Field(() => String, { nullable: false })
  name: string;
}

export const OrderStatusSchema = SchemaFactory.createForClass(OrderStatus);
