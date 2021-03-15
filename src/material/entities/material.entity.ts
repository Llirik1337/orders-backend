import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Material {
  @Field(() => Int, { nullable: false, description: 'Id of Customer' })
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  units: string;

  @Field(() => Float)
  cost: number;

  @Field(() => Boolean)
  isAvailable: boolean;
}
