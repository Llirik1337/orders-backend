import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMaterialInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  units: string;

  @Field(() => Number)
  cost: number;

  @Field(() => Int, { defaultValue: 0 })
  count: number;
}
