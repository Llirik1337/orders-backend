import { CreateBlankMaterialInput } from './create-blank-material.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBlankMaterialInput extends PartialType(
  CreateBlankMaterialInput,
) {
  @Field(() => String)
  id: string;
}
