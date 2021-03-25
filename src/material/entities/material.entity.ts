import { Field, Int, Float, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
export type MaterialDocument = Material & Document;
@Schema({ timestamps: true, id: true })
@ObjectType()
export class Material {
  @Field(() => String)
  _id: string;

  @Prop({ type: MongooseSchema.Types.String, unique: true })
  @Field(() => String)
  name: string;

  @Prop({ type: MongooseSchema.Types.String })
  @Field(() => String)
  units: string;

  @Prop({ type: MongooseSchema.Types.Number })
  @Field(() => Float)
  cost: number;

  @Prop({ type: MongooseSchema.Types.Number })
  @Field(() => Int)
  count: number;
}
export const MaterialSchema = SchemaFactory.createForClass(Material);
