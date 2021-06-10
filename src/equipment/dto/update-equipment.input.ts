import { CreateEquipmentInput } from './create-equipment.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class UpdateEquipmentInput extends PartialType(CreateEquipmentInput) {
  @IsMongoId()
  @Field(() => String)
  id: string;
}
