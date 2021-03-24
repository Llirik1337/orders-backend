import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Operation } from 'src/operation/entities/operation.entity';
import { OneToMany } from 'typeorm';

@ObjectType()
export class Equipment {
  @Field(() => Int, { nullable: false, description: 'Id of Customer' })
  id: number;

  @Field(() => String, {
    nullable: false,
    description: 'Name of Equipment',
  })
  name: string;

  @Field(() => String, { defaultValue: '', description: 'Notes of Equipment' })
  notes: string;

  @Field(() => Int, { defaultValue: 0, description: 'Count of Equipment' })
  count: number;

  @Field(() => Operation, {
    defaultValue: 0,
    description: 'Count of Equipment',
  })
  @OneToMany(() => Operation, (operation) => operation.equipment)
  photos: Operation[];
}
