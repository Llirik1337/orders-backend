import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CurrencyService } from './currency.service';
import { Currency } from './entities/currency.entity';
import { CreateCurrencyInput } from './dto/create-currency.input';
import { UpdateCurrencyInput } from './dto/update-currency.input';

@Resolver(() => Currency)
export class CurrencyResolver {
  constructor(private readonly currencyService: CurrencyService) {}

  @Mutation(() => Currency)
  async createCurrency(
    @Args('createCurrencyInput') createCurrencyInput: CreateCurrencyInput,
  ) {
    return await this.currencyService.create(createCurrencyInput);
  }

  @Query(() => [Currency], { name: 'currencies' })
  async findAll() {
    return await this.currencyService.findAll();
  }

  @Query(() => Currency, { name: 'currency' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.currencyService.findOne(id);
  }

  @Mutation(() => Currency)
  async updateCurrency(
    @Args('updateCurrencyInput') updateCurrencyInput: UpdateCurrencyInput,
  ) {
    return await this.currencyService.update(
      updateCurrencyInput.id,
      updateCurrencyInput,
    );
  }

  @Mutation(() => Currency)
  async removeCurrency(@Args('id', { type: () => String }) id: string) {
    return await this.currencyService.remove(id);
  }
}
