import { CreateCustomerInput } from './create-customer.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class UpdateCustomerInput extends PartialType(CreateCustomerInput) {
  @IsMongoId()
  @Field(() => String, { nullable: false, description: 'Id of Customer' })
  id: string;
}
