import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import {
  ComponentOperation,
  ComponentOperationDocument,
} from 'src/component-operation/entities/component-operation.entity';
import {
  Employee,
  EmployeeDocument,
} from 'src/employee/entities/employee.entity';
import { BaseModel } from '../../_core';

export type OrderComponentOperationDocument = OrderComponentOperation & Document;

@Schema({ timestamps: true })
@ObjectType()
export class OrderComponentOperation extends BaseModel {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'ComponentOperation',
    autopopulate: true,
  })
  @Field(() => ComponentOperation)
  componentOperation: ComponentOperationDocument;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Employee',
    autopopulate: true,
    required: false,
  })
  @Field(() => Employee, { nullable: true })
  employee?: EmployeeDocument;
}

export const OrderComponentOperationSchema = SchemaFactory.createForClass(
  OrderComponentOperation,
);
