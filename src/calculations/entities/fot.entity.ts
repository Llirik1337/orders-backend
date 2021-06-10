import { Field, ObjectType } from '@nestjs/graphql';
import { IFot } from '../interfaces/IFot';
import { Cost } from './cost.entity';

@ObjectType()
export class FOT implements IFot {
  @Field(() => Cost, { description: 'Example field (placeholder)' })
  withTax: Cost;
  @Field(() => Cost, { description: 'Example field (placeholder)' })
  withoutTax: Cost;
}
