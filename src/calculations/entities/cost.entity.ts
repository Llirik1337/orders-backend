import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ICost } from '../ICost';

@ObjectType()
export class Cost {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  one: number;
  @Field(() => Int, { description: 'Example field (placeholder)' })
  consignment: number;
}
