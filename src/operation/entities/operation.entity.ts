import { ObjectType, Float, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Equipment } from 'src/equipment/entities/equipment.entity';
import { Material } from 'src/material/entities/material.entity';
export type OperationDocument = Operation & Document;

@ObjectType()
@Schema({ timestamps: true, id: true })
export class Operation {
  @Field(() => String)
  _id: string;

  @Prop({ type: MongooseSchema.Types.String, unique: true })
  @Field(() => String, { nullable: false })
  name: string;

  @Prop({ type: MongooseSchema.Types.Number })
  @Field(() => Float, { nullable: false, description: 'notes' })
  price: number;

  @Prop({ type: MongooseSchema.Types.String })
  @Field(() => String, {
    nullable: true,
    description: 'notes',
  })
  notes: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

export const OperationSchema = SchemaFactory.createForClass(Operation);
