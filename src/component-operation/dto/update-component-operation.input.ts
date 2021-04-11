import { CreateComponentOperationInput } from './create-component-operation.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsMongoId, IsString } from 'class-validator';

@InputType()
export class UpdateComponentOperationInput extends PartialType(
  CreateComponentOperationInput,
) {
  @IsMongoId()
  @Field(() => String)
  id: string;
}
