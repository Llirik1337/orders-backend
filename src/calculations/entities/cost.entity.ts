import { Field, Float, ObjectType } from '@nestjs/graphql';
import { ICost } from '../interfaces/ICost';

@ObjectType()
export class Cost implements ICost {
  @Field(() => Float, { description: 'Example field (placeholder)' })
  one: number;
  @Field(() => Float, { description: 'Example field (placeholder)' })
  consignment: number;
}
