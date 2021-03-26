import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import {
  Operation,
  OperationDocument,
} from 'src/operation/entities/operation.entity';
export type EquipmentDocument = Equipment & Document;
@ObjectType()
@Schema({ timestamps: true, id: true })
export class Equipment {
  @Field(() => String)
  _id: string;

  @Prop({ type: MongooseSchema.Types.String, unique: true })
  @Field(() => String, { nullable: false })
  name: string;

  @Prop({ type: MongooseSchema.Types.String })
  @Field(() => String, { defaultValue: '' })
  notes: string;

  @Prop({ type: MongooseSchema.Types.Number })
  @Field(() => Int, { defaultValue: 0 })
  count: number;

  // @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Operation' }] })
  // @Field(() => Operation, {
  //   description: 'Count of Equipment',
  // })
  // operations: OperationDocument[];
}

export const EquipmentSchema = SchemaFactory.createForClass(Equipment);
