import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCustomerInput {
  @Field(() => String, { description: 'Full Name of customer' })
  fullName: string;

  @Field(() => String)
  company: string;

  @Field(() => String)
  notes: string;
}
