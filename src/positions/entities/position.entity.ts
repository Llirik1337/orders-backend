import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
export type PositionDocument = Position & Document;

@Schema({ timestamps: true, id: true })
@ObjectType()
export class Position {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @Prop({ require: true, type: MongooseSchema.Types.String, unique: true })
  name: string;
  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
export const PositionSchema = SchemaFactory.createForClass(Position);
