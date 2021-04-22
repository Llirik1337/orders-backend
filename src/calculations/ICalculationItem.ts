import { ICost } from './ICost';

export interface ICalculationItem {
  name: string;
  count: number;
  materialСosts: ICost;
  fot: {
    withTax: ICost;
    withoutTax: ICost;
  };
  manufacturingСost: ICost;
}
