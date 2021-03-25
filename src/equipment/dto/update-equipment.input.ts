import { CreateEquipmentInput } from './create-equipment.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEquipmentInput extends PartialType(CreateEquipmentInput) {
  @Field(() => String)
  id: string;
}
