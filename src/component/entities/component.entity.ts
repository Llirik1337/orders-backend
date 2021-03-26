import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Operation } from 'src/operation/entities/operation.entity';
import { Order } from 'src/order/entities/order.entity';
export type ComponentDocument = Component & Document;
@ObjectType()
@Schema({ timestamps: true, id: true, _id: true })
export class Component {
  @Field(() => String)
  _id: string;

  @Prop({ type: MongooseSchema.Types.String, required: true })
  @Field(() => String, { nullable: false, description: 'notes' })
  name: string;

  @Prop({ type: MongooseSchema.Types.String, required: false })
  @Field(() => String, { nullable: true })
  notes: string;

  //TODO Добавить потом
  // @Prop({
  //   type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Order' }],
  //   default: [],
  // })
  // @Field(() => Order, { defaultValue: [] })
  // orders: Order[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Operation' }],
    default: [],
  })
  @Field(() => [Operation], { defaultValue: [] })
  operations: Operation[];
}
export const ComponentSchema = SchemaFactory.createForClass(Component);
