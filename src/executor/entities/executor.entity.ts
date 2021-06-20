import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { BaseModel } from '../../_core';

export type ExecutorDocument = Executor & Document;

@ObjectType()
@Schema({ timestamps: true, id: true })
export class Executor extends BaseModel {
  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
    unique: true,
    trim: true,
  })
  @Field(() => String, { nullable: false })
  name: string;
}

export const ExecutorSchema = SchemaFactory.createForClass(Executor);
