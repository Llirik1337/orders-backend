import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import {
  Operation,
  OperationDocument,
} from 'src/operation/entities/operation.entity';
export type ComponentOperationDocument = ComponentOperation & Document;

@Schema({ timestamps: true })
@ObjectType()
export class ComponentOperation {
  @Field(() => String)
  _id: string;

  @Prop({ type: MongooseSchema.Types.Number })
  @Field(() => Float)
  time: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Material' })
  @Field(() => Operation)
  operation: OperationDocument;

  @Prop({ type: MongooseSchema.Types.Boolean })
  @Field(() => Boolean)
  isBatch: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
export const ComponentOperationSchema = SchemaFactory.createForClass(
  ComponentOperation,
);
