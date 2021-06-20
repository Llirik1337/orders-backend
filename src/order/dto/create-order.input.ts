import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsDate, IsMongoId, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateOrderInput {
  @IsString()
  @Field(() => String, { nullable: false })
  name: string;

  @IsMongoId()
  @Field(() => String, { nullable: false })
  customerId: string;

  @IsArray()
  @Field(() => [String], { nullable: true })
  orderComponentsId?: string[];

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  notes?: string;

  @IsMongoId()
  @Field(() => String, { nullable: false })
  statusId: string;

  @IsMongoId()
  @Field(() => String, { nullable: true })
  executorId?: string;

  @IsOptional()
  @IsDate()
  @Field(() => Date, { nullable: true })
  finishAt?: Date;
}
