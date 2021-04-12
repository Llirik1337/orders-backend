import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Executor } from 'src/executor/entities/executor.entity';
import {
  OrderComponent,
  OrderComponentDocument,
} from 'src/order-component/entities/order-component.entity';
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
  orderComponents: OrderComponentDocument[];

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
  executor: Executor;

  @Field(() => Float, { nullable: false })
  @Prop({ type: MongooseSchema.Types.Number, default: 0 })
  cost: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
