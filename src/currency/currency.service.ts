import { Injectable } from '@nestjs/common';
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
    return await this.currencyModel.find().exec();
  }

  async findById(id: string): Promise<CurrencyDocument> {
    return await this.currencyModel.findById(id);
  }

  async update(
    id: string,
    updateCurrencyInput: UpdateCurrencyInput,
  ): Promise<CurrencyDocument> {
    return await this.currencyModel.findByIdAndUpdate(id, updateCurrencyInput);
  }

  async remove(id: string): Promise<CurrencyDocument> {
    return await this.currencyModel.findByIdAndRemove(id);
  }
}
