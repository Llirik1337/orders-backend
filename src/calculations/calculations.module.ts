import { Module } from '@nestjs/common';
import { CalculationsService } from './calculations.service';
import { CalculationsResolver } from './calculations.resolver';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [OrderModule],
  providers: [CalculationsResolver, CalculationsService],
  exports: [CalculationsService],
})
export class CalculationsModule {}
