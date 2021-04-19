import { InputType, Int, Field } from '@nestjs/graphql';
import { IsArray, IsMongoId, IsNumber } from 'class-validator';

@InputType()
export class CreateOrderComponentInput {
  @IsNumber()
  @Field(() => Int)
  count: number;

  @IsMongoId()
  @Field(() => String)
  componentId: string;

  @IsArray()
  @Field(() => [String])
  batchOperationsId: string[];

  @IsArray()
  @Field(() => [String])
  orderOperationsId: string[];
}
