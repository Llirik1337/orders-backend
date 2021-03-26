import { CreateOrderComponentInput } from './create-order-component.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOrderComponentInput extends PartialType(
  CreateOrderComponentInput,
) {
  @Field(() => String)
  id: string;
}
