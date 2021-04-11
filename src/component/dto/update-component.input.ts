import { CreateComponentInput } from './create-component.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class UpdateComponentInput extends PartialType(CreateComponentInput) {
  @IsMongoId()
  @Field(() => String)
  id: string;
}
