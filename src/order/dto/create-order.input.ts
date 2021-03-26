import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  customerId: string;

  @Field(() => [String], { nullable: true })
  componentsId: string[];

  @Field(() => String, { nullable: false })
  statusId: string;

  @Field(() => Number, { nullable: true })
  price: number;
}
