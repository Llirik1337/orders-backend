import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OperationPriceService } from './operation-price.service';
import { OperationPrice } from './entities/operation-price.entity';
import { CreateOperationPriceInput } from './dto/create-operation-price.input';
import { UpdateOperationPriceInput } from './dto/update-operation-price.input';

@Resolver(() => OperationPrice)
export class OperationPriceResolver {
  constructor(private readonly operationPriceService: OperationPriceService) {}

  @Mutation(() => OperationPrice)
  createOperationPrice(@Args('createOperationPriceInput') createOperationPriceInput: CreateOperationPriceInput) {
    return this.operationPriceService.create(createOperationPriceInput);
  }

  @Query(() => [OperationPrice], { name: 'operationPrice' })
  findAll() {
    return this.operationPriceService.findAll();
  }

  @Query(() => OperationPrice, { name: 'operationPrice' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.operationPriceService.findOne(id);
  }

  @Mutation(() => OperationPrice)
  updateOperationPrice(@Args('updateOperationPriceInput') updateOperationPriceInput: UpdateOperationPriceInput) {
    return this.operationPriceService.update(updateOperationPriceInput.id, updateOperationPriceInput);
  }

  @Mutation(() => OperationPrice)
  removeOperationPrice(@Args('id', { type: () => Int }) id: number) {
    return this.operationPriceService.remove(id);
  }
}
