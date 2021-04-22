import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Cost } from './cost.entity';
import { FOT } from './fot.entity';

@ObjectType()
export class Calculation {
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
}
