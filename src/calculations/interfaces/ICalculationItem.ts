import { ICost } from './ICost';

export interface ICalculationItem {
  name: string;
  count: number;
  matCost: ICost;
  fot: {
    withTax: ICost;
    withoutTax: ICost;
  };
  party: ICost;
}
