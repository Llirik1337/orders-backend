import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCurrencyInput {
  @Field(() => String, { nullable: false })
  NumCode: string;

  @Field(() => String, { nullable: false })
  CharCode: string;

  @Field(() => Int, { nullable: false })
  Nominal: number;

  @Field(() => String, { nullable: false })
  Name: string;

  @Field(() => Number, { nullable: false })
  Value: number;
}
