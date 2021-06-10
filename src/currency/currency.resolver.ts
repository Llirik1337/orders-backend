import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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
  async findAll(
    @Args('deleted', { type: () => Boolean, defaultValue: false })
    deleted: boolean,
  ) {
    return await this.currencyService.findAll(deleted);
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
  async recoveryCurrency(@Args('id', { type: () => String }) id: string) {
    return await this.currencyService.recovery(id);
  }

  @Mutation(() => [Currency])
  async recoveryCurrencies(
    @Args('ids', { type: () => [String] }) ids: string[],
  ) {
    return await this.currencyService.recoveryList(ids);
  }

  @Mutation(() => Currency)
  async forceRemoveCurrency(@Args('id', { type: () => String }) id: string) {
    return await this.currencyService.forceRemove(id);
  }

  @Mutation(() => Currency)
  async removeCurrency(@Args('id', { type: () => String }) id: string) {
    return await this.currencyService.remove(id);
  }
}
