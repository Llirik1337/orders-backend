import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  customerId: string;

  @Field(() => [String], { nullable: true })
  orderComponentsId: string[];

  @Field(() => String, { nullable: false })
  statusId: string;

  @Field(() => Number, { nullable: true })
  cost: number;
}
