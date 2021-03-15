import { CreateCustomerInput } from './create-customer.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCustomerInput extends PartialType(CreateCustomerInput) {
  @Field(() => Int, { nullable: false, description: 'Id of Customer' })
  id: number;

  @Field(() => String)
  fullName: string;

  @Field(() => String)
  company: string;

  @Field(() => String)
  notes: string;
}
