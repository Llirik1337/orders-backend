import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mongoose, Schema as MongooseSchema } from 'mongoose';
import { Component } from 'src/component/entities/component.entity';
import { OrderStatus } from 'src/order-status/entities/order-status.entity';
import { Customer } from '../../customer/entities/customer.entity';

export type OrderDocument = Order & Document;

@ObjectType()
@Schema({ timestamps: true, id: true })
export class Order {
  @Field(() => String)
  _id: string;

  @Prop({ required: true, type: MongooseSchema.Types.String })
  @Field(() => String, { nullable: false })
  name: string;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'Customer',
  })
  @Field(() => Customer, { nullable: false })
  customer: Customer;

  @Field(() => [Component], { nullable: false })
  @Prop({
    required: true,
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Component' }],
  })
  components: Component[];

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'Customer',
  })
  @Field(() => OrderStatus, { nullable: false })
  status: OrderStatus;

  @Field(() => Float, { nullable: false })
  @Prop({ type: MongooseSchema.Types.Number })
  price: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
