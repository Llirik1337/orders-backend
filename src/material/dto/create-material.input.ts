import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateMaterialInput {
  @IsString()
  @Field(() => String)
  name: string;

  @IsNumber()
  @Field(() => Float)
  length: number;

  @IsNumber()
  @Field(() => Float)
  width: number;

  @IsNumber()
  @Field(() => Number)
  cost: number;

  @IsNumber()
  @Field(() => Int, { defaultValue: 0 })
  count: number;
}
