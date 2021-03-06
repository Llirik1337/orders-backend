import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { round } from 'src/_core/common';
import { Executor } from 'src/executor/entities/executor.entity';
import {
  OrderComponent,
  OrderComponentDocument,
} from 'src/order-component/entities/order-component.entity';
import { OrderStatus } from 'src/order-status/entities/order-status.entity';
import { Customer } from '../../customer/entities/customer.entity';
import { BaseModel } from '../../_core';

export type OrderDocument = Order & Document;

@ObjectType()
@Schema({ timestamps: true })
export class Order extends BaseModel {
  @Prop({ required: true, type: MongooseSchema.Types.String })
  @Field(() => String, { nullable: false })
  name: string;

  @Prop({ required: false, type: MongooseSchema.Types.String })
  @Field(() => String, { nullable: true })
  notes?: string;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'Customer',
    autopopulate: true,
  })
  @Field(() => Customer, { nullable: false })
  customer: Customer;

  @Field(() => [OrderComponent], { nullable: true })
  @Prop({
    required: false,
    type: [
      {
        type: MongooseSchema.Types.ObjectId,
        ref: 'OrderComponent',
        autopopulate: true,
      },
    ],
    default: [],
  })
  orderComponents?: OrderComponentDocument[];

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'OrderStatus',
    autopopulate: true,
  })
  @Field(() => OrderStatus, { nullable: false })
  status: OrderStatus;

  @Prop({
    required: false,
    type: MongooseSchema.Types.ObjectId,
    ref: 'Executor',
    autopopulate: true,
  })
  @Field(() => Executor, { nullable: true })
  executor?: Executor;

  @Field(() => Float, { nullable: false })
  cost: number;

  @Field(() => Date, { nullable: true })
  @Prop({ required: false })
  finishAt?: Date | null;

  @Field(() => Float, { nullable: true })
  durationAt?: number;

  @Prop({ required: false, type: MongooseSchema.Types.Boolean })
  @Field(() => Boolean, { nullable: true })
  isFirst?: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

const cost = OrderSchema.virtual('cost');
cost.get(function (this: Order) {
  let cost = 0;
  for (const component of this.orderComponents) {
    if (component.cost) cost += round(component.cost, 2);
  }
  return round(cost, 2);
});

const duration = OrderSchema.virtual('durationAt');
duration.get(function (this: Order) {
  if (this.createdAt && this.finishAt) {
    const oneDay = 1000 * 60 * 60 * 24;
    const diff = Math.round(
      (this.finishAt.getTime() - this.createdAt.getTime()) / oneDay,
    );

    return diff;
  }
});
