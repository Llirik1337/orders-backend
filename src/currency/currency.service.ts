import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model } from 'mongoose';
import { CreateCurrencyInput } from './dto/create-currency.input';
import { UpdateCurrencyInput } from './dto/update-currency.input';
import { Currency, CurrencyDocument } from './entities/currency.entity';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectModel(Currency.name) private currencyModel: Model<CurrencyDocument>,
  ) {}
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

  async findAll() {
    return await this.currencyModel.find().lean({ autopopulate: true });
  }

  async findOne(id: string): Promise<CurrencyDocument> {
    const found = await this.currencyModel.findById(id);
    if (!found)
      throw new NotFoundException({
        message: `Currency not found by id ${id}`,
      });
    return found;
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

  async remove(id: string): Promise<CurrencyDocument> {
    const found = await this.findOne(id);
    await found.delete();
    return found;
  }
}
