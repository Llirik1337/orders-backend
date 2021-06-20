import { CreateOrderComponentOperationInput } from './create-order-component-operation.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOrderComponentOperationInput extends PartialType(
  CreateOrderComponentOperationInput,
) {
  @Field(() => String)
  id: string;
}
