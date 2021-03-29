import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderComponentInput {
  @Field(() => Int)
  count: number;

  @Field(() => String)
  componentId: string;

  @Field(() => [String])
  batchOperationsId: string[];
}
