import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Material {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
