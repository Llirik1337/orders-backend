import { CreateEmployeeInput } from './create-employee.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEmployeeInput extends PartialType(CreateEmployeeInput) {
  @Field(() => Int, { nullable: false, description: 'Id of employee' })
  id: number;

  @Field(() => String, { description: 'Full Name of employee' })
  fullName: string;

  @Field(() => String, { description: 'Position of employee' })
  position: string;
}
