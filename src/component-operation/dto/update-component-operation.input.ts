import { CreateComponentOperationInput } from './create-component-operation.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class UpdateComponentOperationInput extends PartialType(
  CreateComponentOperationInput,
) {
  @IsMongoId()
  @Field(() => String)
  id: string;
}
