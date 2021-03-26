import { CreateOperationInput } from './create-operation.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOperationInput extends PartialType(CreateOperationInput) {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: false })
  name: string;
}
