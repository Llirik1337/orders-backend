import { CreateComponentOperationInput } from './create-component-operation.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateComponentOperationInput extends PartialType(
  CreateComponentOperationInput,
) {
  @Field(() => String)
  id: string;
}
