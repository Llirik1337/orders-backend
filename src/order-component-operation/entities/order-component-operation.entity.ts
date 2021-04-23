import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
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

export type OrderComponentOperationDocument = OrderComponentOperation &
  Document;

@Schema({ timestamps: true })
@ObjectType()
export class OrderComponentOperation {
  @Field(() => String)
  _id: string;

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
  employee: EmployeeDocument;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

export const OrderComponentOperationSchema = SchemaFactory.createForClass(
  OrderComponentOperation,
);
