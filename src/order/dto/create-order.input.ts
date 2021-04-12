import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsMongoId, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateOrderInput {
  @IsString()
  @Field(() => String, { nullable: false })
  name: string;

  @IsMongoId()
  @Field(() => String, { nullable: false })
  customerId: string;

  @IsArray({ each: true })
  @Field(() => [String], { nullable: true })
  orderComponentsId: string[];

  @IsMongoId()
  @Field(() => String, { nullable: false })
  statusId: string;

  @IsMongoId()
  @Field(() => String, { nullable: true })
  executorId: string;

  @IsNumber()
  @Field(() => Number, { nullable: true })
  cost: number;
}
