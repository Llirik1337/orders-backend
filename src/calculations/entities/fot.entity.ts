import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ICost } from '../ICost';
import { Cost } from './cost.entity';

@ObjectType()
export class FOT {
  @Field(() => Cost, { description: 'Example field (placeholder)' })
  withTax: Cost;
  @Field(() => Cost, { description: 'Example field (placeholder)' })
  withoutTax: Cost;
}
