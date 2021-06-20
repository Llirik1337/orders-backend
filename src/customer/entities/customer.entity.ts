import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { BaseModel } from '../../_core';

export type CustomerDocument = Customer & Document;

@ObjectType()
@Schema({ timestamps: true, id: true })
export class Customer extends BaseModel {
  @Prop({ type: MongooseSchema.Types.String })
  @Field(() => String, { nullable: false })
  fullName: string;

  @Prop({ type: MongooseSchema.Types.String })
  @Field(() => String, { nullable: false })
  company: string;

  @Prop({ type: MongooseSchema.Types.String })
  @Field(() => String, { nullable: true })
  email?: string;

  @Prop({ type: MongooseSchema.Types.String })
  @Field(() => String, { nullable: true })
  phone?: string;

  @Prop({ type: MongooseSchema.Types.String })
  @Field(() => String, { nullable: true })
  address?: string;

  @Prop({ type: MongooseSchema.Types.String })
  @Field(() => String, { nullable: true })
  notes?: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
