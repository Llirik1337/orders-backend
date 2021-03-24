import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Equipment } from 'src/equipment/entities/equipment.entity';
import { Material } from 'src/material/entities/material.entity';
import { ManyToOne, OneToMany } from 'typeorm';

@ObjectType()
export class Operation {
  @Field(() => Int, { nullable: false, description: 'Id of Customer' })
  id: number;

  @Field(() => String, { nullable: false, description: 'notes' })
  price: string;

  @Field(() => Equipment, { nullable: false, description: 'notes' })
  @ManyToOne(() => Equipment, (equipment) => equipment.id)
  equipment: Equipment;

  @Field(() => Material, { nullable: false, description: 'notes' })
  @OneToMany(() => Material, (material) => material.id)
  material: Material[];
}
