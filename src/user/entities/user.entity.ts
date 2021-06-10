import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseModel } from '../../_core';

export type UserDocument = User & Document;

@Schema()
@ObjectType()
export class User extends BaseModel {
  @Prop({ required: true })
  @Field(() => String, { description: 'Login' })
  login: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
