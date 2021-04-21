import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { round } from 'src/common';

import {
  Component,
  ComponentDocument,
} from 'src/component/entities/component.entity';
import {
  OrderComponentOperation,
  OrderComponentOperationDocument,
} from 'src/order-component-operation/entities/order-component-operation.entity';

export type OrderComponentDocument = OrderComponent & Document;

@Schema({ timestamps: true })
@ObjectType()
export class OrderComponent {
  @Field(() => String)
  _id: string;

  @Prop({ type: MongooseSchema.Types.Number })
  @Field(() => Int)
  count: number;

  @Field(() => Float)
  cost: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Component',
    autopopulate: true,
  })
  @Field(() => Component)
  component: ComponentDocument;

  @Prop({
    type: [
      {
        type: MongooseSchema.Types.ObjectId,
        ref: 'OrderComponentOperation',
        autopopulate: true,
      },
    ],
    default: [],
  })
  @Field(() => [OrderComponentOperation])
  batchOperations: OrderComponentOperationDocument[];

  @Prop({
    type: [
      {
        type: MongooseSchema.Types.ObjectId,
        ref: 'OrderComponentOperation',
        autopopulate: true,
      },
    ],
    default: [],
  })
  @Field(() => [OrderComponentOperation])
  orderComponentOperations: OrderComponentOperationDocument[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
export const OrderComponentSchema = SchemaFactory.createForClass(
  OrderComponent,
);

const cost = OrderComponentSchema.virtual('cost');
cost.get(function (this: OrderComponent) {
  const cost = this.component.cost * this.count;
  return round(cost, 2);
});
