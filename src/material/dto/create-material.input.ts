import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateMaterialInput {
  @Field(() => String)
  name: string;

  @Field(() => Float)
  length: number;

  @Field(() => Float)
  width: number;

  @Field(() => Number)
  cost: number;

  @Field(() => Int, { defaultValue: 0 })
  count: number;
}
