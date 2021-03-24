import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Material {
  @Field(() => Int, { nullable: false, description: 'Id of Customer' })
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  units: string;

  @Field(() => String)
  cost: string;

  @Field(() => Int, { defaultValue: 0 })
  count: number;
}
