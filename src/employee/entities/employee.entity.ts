import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import {
  Position,
  PositionDocument,
} from 'src/positions/entities/position.entity';
import { BaseModel } from '../../_core';

export type EmployeeDocument = Employee & Document;

@Schema({ timestamps: true, id: true })
@ObjectType()
export class Employee extends BaseModel {
  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
    unique: true,
    trim: true,
  })
  @Field(() => String, { nullable: false })
  fullName: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Position',
    autopopulate: true,
  })
  @Field(() => Position)
  position: PositionDocument;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
