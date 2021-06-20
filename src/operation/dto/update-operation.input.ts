import { CreateOperationInput } from './create-operation.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class UpdateOperationInput extends PartialType(CreateOperationInput) {
  @IsMongoId()
  @Field(() => String)
  id: string;
}
