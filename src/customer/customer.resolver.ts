import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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
  async findAll(
    @Args('deleted', { type: () => Boolean, defaultValue: false })
    deleted: boolean,
  ) {
    return await this.customerService.findAll(deleted);
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
  async recoveryCustomer(@Args('id', { type: () => String }) id: string) {
    return await this.customerService.recovery(id);
  }

  @Mutation(() => [Customer])
  async recoveryCustomers(
    @Args('ids', { type: () => [String] }) ids: string[],
  ) {
    return await this.customerService.recoveryList(ids);
  }

  @Mutation(() => Customer)
  async forceRemoveCustomer(@Args('id', { type: () => String }) id: string) {
    return await this.customerService.forceRemove(id);
  }

  @Mutation(() => Customer)
  async removeCustomer(@Args('id', { type: () => String }) id: string) {
    return await this.customerService.remove(id);
  }
}
