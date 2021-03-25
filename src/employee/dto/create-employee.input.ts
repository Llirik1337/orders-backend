import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateEmployeeInput {
  @Field(() => String, { description: 'Full Name of employee' })
  fullName: string;

  @Field(() => String)
  positionId: string;
}
