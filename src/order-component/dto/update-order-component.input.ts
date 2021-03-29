import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateOrderComponentInput } from './create-order-component.input';

@InputType()
export class UpdateOrderComponentInput extends PartialType(
  CreateOrderComponentInput,
) {
  @Field(() => String)
  id: string;
}
