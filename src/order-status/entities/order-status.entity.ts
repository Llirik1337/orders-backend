import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
export type OrderStatusDocument = OrderStatus & Document;

@ObjectType()
@Schema({ timestamps: true, id: true })
export class OrderStatus {
  @Field(() => String)
  _id: string;

  @Prop({ require: true, type: MongooseSchema.Types.String, unique: true })
  @Field(() => String, { nullable: false })
  name: string;
}

export const OrderStatusSchema = SchemaFactory.createForClass(OrderStatus);
