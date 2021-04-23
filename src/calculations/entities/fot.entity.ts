import { ObjectType, Field } from '@nestjs/graphql';
import { IFot } from '../IFot';
import { Cost } from './cost.entity';

@ObjectType()
export class FOT implements IFot {
  @Field(() => Cost, { description: 'Example field (placeholder)' })
  withTax: Cost;
  @Field(() => Cost, { description: 'Example field (placeholder)' })
  withoutTax: Cost;
}
