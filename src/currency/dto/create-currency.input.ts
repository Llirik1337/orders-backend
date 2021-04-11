import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateCurrencyInput {
  @IsString()
  @Field(() => String, { nullable: false })
  NumCode: string;

  @IsString()
  @Field(() => String, { nullable: false })
  CharCode: string;

  @IsNumber()
  @Field(() => Int, { nullable: false })
  Nominal: number;

  @IsString()
  @Field(() => String, { nullable: false })
  Name: string;

  @IsNumber()
  @Field(() => Number, { nullable: false })
  Value: number;
}
