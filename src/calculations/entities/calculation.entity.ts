import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ICalculationItem } from '../ICalculationItem';
import { ICost } from '../ICost';
import { Cost } from './cost.entity';
import { FOT } from './fot.entity';

@ObjectType()
export class Calculation implements ICalculationItem {
  @Field(() => String)
  _id: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  name: string;
  @Field(() => Int, { description: 'Example field (placeholder)' })
  count: number;

  @Field(() => Cost, { description: 'Example field (placeholder)' })
  matCost: Cost;

  @Field(() => FOT, { description: 'Example field (placeholder)' })
  fot: FOT;

  @Field(() => Cost, { description: 'Example field (placeholder)' })
  party: Cost;

  @Field(() => Cost, { description: 'Example field (placeholder)' })
  waybills: Cost;

  @Field(() => Cost, { description: 'Example field (placeholder)' })
  profit: Cost;

  @Field(() => Cost, { description: 'Example field (placeholder)' })
  withoutNDC: Cost;

  @Field(() => Cost, { description: 'Example field (placeholder)' })
  NDC: Cost;

  @Field(() => Cost, { description: 'Example field (placeholder)' })
  withNDC: Cost;
}
