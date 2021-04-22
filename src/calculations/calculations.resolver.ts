import { Args, Query, Resolver } from '@nestjs/graphql';
import { CalculationsService } from './calculations.service';
import { Calculation } from './entities/calculation.entity';

@Resolver()
export class CalculationsResolver {
  constructor(private readonly calculationsService: CalculationsService) {}
  @Query(() => [Calculation], { name: 'calculation' })
  async getByOrder(@Args('orderId', { type: () => String }) id: string) {
    return await this.calculationsService.getByOrder(id);
  }
}
