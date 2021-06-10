import { CreateOrderStatusInput } from './create-order-status.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class UpdateOrderStatusInput extends PartialType(
  CreateOrderStatusInput,
) {
  @IsMongoId()
  @Field(() => String)
  id: string;
}
