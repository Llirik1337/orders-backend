import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderComponentOperationInput {
  @Field(() => String)
  componentOperationId: string;

  @Field(() => String, { nullable: true })
  employeeId: string;
}
