import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderComponentOperationInput {
  @Field(() => String)
  componentOperationId: string;

  @Field(() => String)
  employeeId: string;
}
