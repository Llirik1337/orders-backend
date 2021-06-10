import { OrderComponentService } from 'src/order-component/order-component.service';
import { Injectable } from '@nestjs/common';
import { round } from 'src/_core/common';
import { OrderService } from 'src/order/order.service';
import { Calculation } from './entities/calculation.entity';
import { Cost } from './entities/cost.entity';
import { FOT } from './entities/fot.entity';

@Injectable()
export class CalculationsService {
  constructor(
    private readonly orderService: OrderService,
    private readonly orderComponentService: OrderComponentService,
  ) {}

  async getByOrder(id: string): Promise<Calculation[]> {
    const order = await this.orderService.findOne(id);
    const results: Calculation[] = [];

    for (const orderComponent of order.orderComponents) {
      const item = await this.getByOrderComponent(orderComponent._id);
      results.push(item);
    }

    return results;
  }

  async getByOrderComponent(id: string) {
    const orderComponent = await this.orderComponentService.findOne(id);

    const count = orderComponent.count;
    const component = orderComponent.component;
    const name = component.name;
    const fotWithTax = round(orderComponent.fot * 1.3028, 2);
    const materialCostOne = orderComponent.materialCost;
    const manufacturingCostOne = round(fotWithTax + materialCostOne, 2);

    // Materials
    const matCost = new Cost();
    matCost.one = materialCostOne;
    matCost.consignment = round(materialCostOne * count, 2);

    // Fot
    const fot = new FOT();

    const withTax = new Cost();
    withTax.one = fotWithTax;
    withTax.consignment = round(fotWithTax * count, 2);

    const withoutTax = new Cost();
    withoutTax.one = orderComponent.fot;
    withoutTax.consignment = round(orderComponent.fot * count, 2);

    fot.withTax = withTax;
    fot.withoutTax = withoutTax;

    // Party
    const party = new Cost();
    party.one = manufacturingCostOne;
    party.consignment = round(manufacturingCostOne * count, 2);

    // Waybills
    const waybills = new Cost();

    waybills.one = round((party.one / 0.8) * 0.2, 2);
    waybills.consignment = round(waybills.one * count, 2);

    // Profit
    const profit = new Cost();

    profit.one = round((waybills.one + party.one) * 0.1, 2);
    profit.consignment = round(profit.one * count, 2);

    // WithoutNDC
    const withoutNDC = new Cost();
    withoutNDC.one = round(profit.one + waybills.one + party.one, 2);
    withoutNDC.consignment = round(withoutNDC.one * count, 2);

    // WithNDC
    const withNDC = new Cost();
    withNDC.one = round(withoutNDC.one * 1.2, 2);
    withNDC.consignment = round(withNDC.one * count, 2);

    // NDC
    const ndc = new Cost();
    ndc.one = round(withNDC.one - withoutNDC.one, 2);
    ndc.consignment = round(withNDC.consignment - withoutNDC.consignment, 2);

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
      NDC: ndc,
    };

    return item;
  }
}
