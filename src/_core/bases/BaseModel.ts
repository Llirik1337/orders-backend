import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

@ObjectType()
@Schema({ timestamps: true, id: true, _id: true })
export class BaseModel {
  @Field(() => String)
  _id: string;

  @Field(() => Date, { nullable: true })
  @Prop({ required: false })
  deletedAt: Date | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
