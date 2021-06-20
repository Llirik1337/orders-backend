import { Field, InputType, Int } from '@nestjs/graphql';
import { IsArray, IsMongoId, IsNumber } from 'class-validator';

@InputType()
export class CreateOrderComponentInput {
  @IsNumber()
  @Field(() => Int, { nullable: false })
  count: number;

  @IsMongoId()
  @Field(() => String, { nullable: false })
  componentId: string;

  @IsArray()
  @Field(() => [String], { nullable: false })
  batchOperationsId: string[];

  @IsArray()
  @Field(() => [String], { nullable: false })
  orderOperationsId: string[];
}
