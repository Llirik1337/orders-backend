import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { round } from 'src/common';
import {
  ComponentOperation,
  ComponentOperationDocument,
} from 'src/component-operation/entities/component-operation.entity';
export type ComponentDocument = Component & Document;
@ObjectType()
@Schema({ timestamps: true, id: true, _id: true })
export class Component {
  @Field(() => String)
  _id: string;

  @Prop({ type: MongooseSchema.Types.String, required: true })
  @Field(() => String, { nullable: false, description: 'notes' })
  name: string;

  @Prop({ type: MongooseSchema.Types.String, required: false })
  @Field(() => String, { nullable: true })
  notes: string;

  @Prop({
    type: [
      {
        type: MongooseSchema.Types.ObjectId,
        ref: 'ComponentOperation',
        autopopulate: true,
      },
    ],
    default: [],
  })
  @Field(() => [ComponentOperation], { defaultValue: [] })
  componentOperations: ComponentOperationDocument[];

  @Field(() => Float, { nullable: false })
  cost: number;

  @Field(() => Float)
  materialCost!: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
export const ComponentSchema = SchemaFactory.createForClass(Component);

const cost = ComponentSchema.virtual('cost');
cost.get(function (this: Component) {
  let cost = 0;

  for (const operation of this.componentOperations) {
    if (operation.blankMaterials) {
      console.log(operation.blankMaterials);
      for (const material of operation.blankMaterials) {
        if (material) cost += round(material.cost, 2);
      }
    }
    console.log(operation.operation);
    if (operation.operation) cost += round(operation.operation.price, 2);
  }

  return round(cost, 2);
});

const materialCost = ComponentSchema.virtual('materialCost');
materialCost.get(function (this: Component) {
  let cost = 0;

  for (const operation of this.componentOperations) {
    for (const material of operation.blankMaterials) {
      if (material) cost += round(material.cost, 2);
    }
  }

  return round(cost, 2);
});
