import { InputType, Int, Field } from '@nestjs/graphql';
import { Equipment } from 'src/equipment/entities/equipment.entity';
import { Material } from 'src/material/entities/material.entity';

@InputType()
export class CreateOperationInput {
  @Field(() => Number, { nullable: false })
  price: number;

  @Field(() => String, { nullable: false })
  notes: string;

  @Field(() => String, { nullable: false })
  equipmentId: string;

  @Field(() => [String], { nullable: false })
  materialsId: string[];
}
