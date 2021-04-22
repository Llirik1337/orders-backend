import { Injectable } from '@nestjs/common';
import { round } from 'src/common';
import { OrderService } from 'src/order/order.service';
import { Calculation } from './entities/calculation.entity';
import { Cost } from './entities/cost.entity';
import { FOT } from './entities/fot.entity';

@Injectable()
export class CalculationsService {
  constructor(private readonly orderService: OrderService) {}

  async getByOrder(id: string): Promise<Calculation[]> {
    const order = await this.orderService.findOne(id);

    const results: Calculation[] = [];

    for (const orderComponent of order.orderComponents) {
      const count = orderComponent.count;
      const component = orderComponent.component;
      const name = component.name;
      const fotWithTax = round(orderComponent.fot * 1.3028, 2);
      const materialCostOne = component.materialCost;
      const manufacturingСostOne = fotWithTax * materialCostOne;

      const matCost = new Cost();

      matCost.one = materialCostOne;
      matCost.consignment = materialCostOne * count;

      const fot = new FOT();
      const withTax = new Cost();
      withTax.one = fotWithTax;
      withTax.consignment = fotWithTax * count;

      const withoutTax = new Cost();

      withoutTax.one = orderComponent.fot;
      withoutTax.consignment = orderComponent.fot * count;

      fot.withTax = withTax;
      fot.withoutTax = withoutTax;

      const party = new Cost();
      party.one = manufacturingСostOne;
      party.consignment = manufacturingСostOne * count;

      const item: Calculation = {
        _id: component._id,
        name,
        count,
        matCost,
        fot,
        party,
      };

      results.push(item);
    }

    return results;
  }
}
