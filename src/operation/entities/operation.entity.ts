import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { BaseModel } from '../../_core';

export type OperationDocument = Operation & Document;

@ObjectType()
@Schema({ timestamps: true, id: true })
export class Operation extends BaseModel {
  @Prop({ type: MongooseSchema.Types.String, unique: true })
  @Field(() => String, { nullable: false })
  name: string;

  @Prop({ type: MongooseSchema.Types.Number })
  @Field(() => Float, { nullable: false, description: 'notes' })
  price: number;

  @Prop({ type: MongooseSchema.Types.String })
  @Field(() => String, {
    nullable: true,
    description: 'notes',
  })
  notes: string;
}

export const OperationSchema = SchemaFactory.createForClass(Operation);
