import { CreateBlankMaterialInput } from './create-blank-material.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class UpdateBlankMaterialInput extends PartialType(
  CreateBlankMaterialInput,
) {
  @IsMongoId()
  @Field(() => String)
  id: string;
}
