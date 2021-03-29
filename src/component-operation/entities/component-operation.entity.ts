import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import {
  BlankMaterial,
  BlankMaterialDocument,
} from 'src/blank-material/entities/blank-material.entity';
import { Equipment } from 'src/equipment/entities/equipment.entity';
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

  @Prop({ type: MongooseSchema.Types.Number, default: 0 })
  @Field(() => Float)
  cost: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Operation',
    required: false,
  })
  @Field(() => Operation, { nullable: true })
  operation: OperationDocument;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Equipment',
    required: false,
  })
  @Field(() => Equipment, { nullable: true })
  equipment: Equipment;

  @Prop({
    type: [
      {
        type: MongooseSchema.Types.ObjectId,
        ref: 'BlankMaterial',
        required: true,
      },
    ],
    default: [],
  })
  @Field(() => [BlankMaterial], { nullable: true })
  blankMaterials: BlankMaterialDocument[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
export const ComponentOperationSchema = SchemaFactory.createForClass(
  ComponentOperation,
);
