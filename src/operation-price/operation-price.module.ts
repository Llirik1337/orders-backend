import { Module } from '@nestjs/common';
import { OperationPriceService } from './operation-price.service';
import { OperationPriceResolver } from './operation-price.resolver';

@Module({
  providers: [OperationPriceResolver, OperationPriceService]
})
export class OperationPriceModule {}
