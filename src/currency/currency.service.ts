import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCurrencyInput } from './dto/create-currency.input';
import { UpdateCurrencyInput } from './dto/update-currency.input';
import { Currency, CurrencyDocument } from './entities/currency.entity';
import { AbstractService } from '../_core';

@Injectable()
export class CurrencyService extends AbstractService<CurrencyDocument> {
  constructor(
    @InjectModel(Currency.name) private currencyModel: Model<CurrencyDocument>,
  ) {
    super(currencyModel);
  }

  async create(
    createCurrencyInput: CreateCurrencyInput,
  ): Promise<CurrencyDocument> {
    const createdCurrency = new this.currencyModel();

    createdCurrency.CharCode = createCurrencyInput.CharCode;
    createdCurrency.Name = createCurrencyInput.Name;
    createdCurrency.Nominal = createCurrencyInput.Nominal;
    createdCurrency.NumCode = createCurrencyInput.NumCode;
    createdCurrency.Value = createCurrencyInput.Value;

    return await createdCurrency.save();
  }

  async update(
    id: string,
    updateCurrencyInput: UpdateCurrencyInput,
  ): Promise<CurrencyDocument> {
    const found = await this.findOne(id);

    if (updateCurrencyInput.CharCode)
      found.CharCode = updateCurrencyInput.CharCode;

    if (updateCurrencyInput.Name) found.Name = updateCurrencyInput.Name;

    if (updateCurrencyInput.Nominal)
      found.Nominal = updateCurrencyInput.Nominal;

    if (updateCurrencyInput.NumCode)
      found.NumCode = updateCurrencyInput.NumCode;

    if (updateCurrencyInput.Value) found.Value = updateCurrencyInput.Value;

    await found.save();
    return await this.findOne(id);
  }
}
