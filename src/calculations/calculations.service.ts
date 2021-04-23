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
      const materialCostOne = orderComponent.materialCost;
      const manufacturingСostOne = round(fotWithTax + materialCostOne, 2);

      const matCost = new Cost();

      matCost.one = materialCostOne;
      matCost.consignment = round(materialCostOne * count, 2);

      const fot = new FOT();
      const withTax = new Cost();
      withTax.one = fotWithTax;
      withTax.consignment = round(fotWithTax * count, 2);

      const withoutTax = new Cost();

      withoutTax.one = orderComponent.fot;
      withoutTax.consignment = round(orderComponent.fot * count, 2);

      fot.withTax = withTax;
      fot.withoutTax = withoutTax;

      const party = new Cost();
      party.one = manufacturingСostOne;
      party.consignment = round(manufacturingСostOne * count, 2);

      const waybills = new Cost();

      waybills.one = round((party.one / 0.8) * 0.2, 2);
      waybills.consignment = round(waybills.one * count, 2);

      const profit = new Cost();

      profit.one = round((waybills.one + party.one) * 0.1, 2);
      profit.consignment = round(profit.one * count, 2);

      const withoutNDC = new Cost();
      withoutNDC.one = round(profit.one + waybills.one + party.one, 2);
      withoutNDC.consignment = round(withoutNDC.one * count, 2);

      const withNDC = new Cost();
      withNDC.one = round(withoutNDC.one * 1.2, 2);
      withNDC.consignment = round(withNDC.one * count, 2);

      const item: Calculation = {
        _id: component._id,
        name,
        count,
        matCost,
        fot,
        party,
        waybills,
        profit,
        withoutNDC,
        withNDC,
      };

      results.push(item);
    }

    return results;
  }
}
