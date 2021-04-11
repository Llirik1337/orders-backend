import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { CreateOrderInput } from './create-order.input';

@InputType()
export class UpdateOrderInput extends PartialType(CreateOrderInput) {
  @IsMongoId()
  @Field(() => String)
  id: string;
}
