import { InputType, Int, Field } from '@nestjs/graphql';
import { Equipment } from 'src/equipment/entities/equipment.entity';
import { Material } from 'src/material/entities/material.entity';

@InputType()
export class CreateOperationInput {
  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => Number, { nullable: false })
  price: number;

  @Field(() => String, { nullable: true })
  notes: string;

  @Field(() => String, { nullable: false })
  equipmentId: string;

  @Field(() => [String], { nullable: false })
  materialsId: string[];
}
