import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCustomerInput {
  @Field(() => String, { nullable: false })
  fullName: string;

  @Field(() => String, { nullable: false })
  company: string;

  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  phone: string;

  @Field(() => String, { nullable: false })
  address: string;

  @Field(() => String, { nullable: false })
  notes: string;
}
