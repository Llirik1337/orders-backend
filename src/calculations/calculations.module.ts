import { Module } from '@nestjs/common';
import { CalculationsService } from './calculations.service';
import { CalculationsResolver } from './calculations.resolver';
import { OrderModule } from 'src/order/order.module';
import { OrderComponentModule } from 'src/order-component/order-component.module';

@Module({
  imports: [OrderModule, OrderComponentModule],
  providers: [CalculationsResolver, CalculationsService],
  exports: [CalculationsService],
})
export class CalculationsModule {}
