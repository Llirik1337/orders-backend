import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyResolver } from './currency.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Currency, CurrencySchema } from './entities/currency.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Currency.name, schema: CurrencySchema },
    ]),
  ],
  providers: [CurrencyResolver, CurrencyService],
  exports: [CurrencyService],
})
export class CurrencyModule {}
