import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ExecutorDocument = Executor & Document;

@ObjectType()
@Schema({ timestamps: true, id: true })
export class Executor {
  @Field(() => String)
  _id: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
    unique: true,
    trim: true,
  })
  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

export const ExecutorSchema = SchemaFactory.createForClass(Executor);
