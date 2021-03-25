import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderStatusInput {
  @Field(() => String, { nullable: false })
  name: string;
}
