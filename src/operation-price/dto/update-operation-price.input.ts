import { CreateOperationPriceInput } from './create-operation-price.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOperationPriceInput extends PartialType(CreateOperationPriceInput) {
  @Field(() => Int)
  id: number;
}
