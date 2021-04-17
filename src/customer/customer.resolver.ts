import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Mutation(() => Customer)
  async createCustomer(
    @Args('createCustomerInput') createCustomerInput: CreateCustomerInput,
  ) {
    return await this.customerService.create(createCustomerInput);
  }

  @Query(() => [Customer], { name: 'customers' })
  async findAll() {
    return await this.customerService.findAll();
  }

  @Query(() => Customer, { name: 'customer' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.customerService.findOne(id);
  }

  @Mutation(() => Customer)
  async updateCustomer(
    @Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput,
  ) {
    return await this.customerService.update(
      updateCustomerInput.id,
      updateCustomerInput,
    );
  }

  @Mutation(() => Customer)
  async removeCustomer(@Args('id', { type: () => String }) id: string) {
    return await this.customerService.remove(id);
  }
}
