import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import {
  ComponentOperation,
  ComponentOperationDocument,
} from 'src/component-operation/entities/component-operation.entity';
import {
  Component,
  ComponentDocument,
} from 'src/component/entities/component.entity';

export type OrderComponentDocument = OrderComponent & Document;

@Schema({ timestamps: true })
@ObjectType()
export class OrderComponent {
  @Field(() => String)
  _id: string;

  @Prop({ type: MongooseSchema.Types.Number })
  @Field(() => Int)
  count: number;

  @Prop({ type: MongooseSchema.Types.Number, default: 0 })
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
        ref: 'ComponentOperation',
        autopopulate: true,
      },
    ],
    default: [],
  })
  @Field(() => [ComponentOperation])
  batchOperations: ComponentOperationDocument[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
export const OrderComponentSchema = SchemaFactory.createForClass(
  OrderComponent,
);
