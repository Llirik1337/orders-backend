import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { CreateOrderComponentInput } from './create-order-component.input';

@InputType()
export class UpdateOrderComponentInput extends PartialType(
  CreateOrderComponentInput,
) {
  @IsMongoId()
  @Field(() => String)
  id: string;
}
