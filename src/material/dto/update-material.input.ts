import { CreateMaterialInput } from './create-material.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class UpdateMaterialInput extends PartialType(CreateMaterialInput) {
  @IsMongoId()
  @Field(() => String)
  id: string;
}
