import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { BaseModel } from '../../_core';

export type PositionDocument = Position & Document;

@Schema({ timestamps: true, id: true })
@ObjectType()
export class Position extends BaseModel {
  @Field(() => String)
  @Prop({ require: true, type: MongooseSchema.Types.String, unique: true })
  name: string;
}

export const PositionSchema = SchemaFactory.createForClass(Position);
