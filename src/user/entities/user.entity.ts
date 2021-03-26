import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true, id: true })
@ObjectType()
export class User {
  @Field(() => String)
  _id: string;
  @Prop({ required: true })
  @Field(() => String, { description: 'Login' })
  login: string;

  @Prop({ required: true })
  password: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
