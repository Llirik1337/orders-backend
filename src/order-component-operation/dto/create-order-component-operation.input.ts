import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderComponentOperationInput {
  @Field(() => String)
  componentId: string;

  @Field(() => String)
  employeeId: string;
}
