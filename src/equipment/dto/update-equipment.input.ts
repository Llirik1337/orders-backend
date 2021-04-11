import { CreateEquipmentInput } from './create-equipment.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class UpdateEquipmentInput extends PartialType(CreateEquipmentInput) {
  @IsMongoId()
  @Field(() => String)
  id: string;
}
