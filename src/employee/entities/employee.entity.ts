import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import {
  Position,
  PositionDocument,
} from 'src/positions/entities/position.entity';
export type EmployeeDocument = Employee & Document;

@Schema({ timestamps: true, id: true })
@ObjectType()
export class Employee {
  @Field(() => String)
  _id: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
    unique: true,
    trim: true,
  })
  @Field(() => String, { nullable: false })
  fullName: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Position' })
  @Field(() => Position)
  position: PositionDocument;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
export const EmployeeSchema = SchemaFactory.createForClass(Employee);
