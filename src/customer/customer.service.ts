import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { Customer, CustomerDocument } from './entities/customer.entity';
import { AbstractService } from '../_core';

@Injectable()
export class CustomerService extends AbstractService<CustomerDocument> {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {
    super(customerModel);
  }

  async create(
    createCustomerInput: CreateCustomerInput,
  ): Promise<CustomerDocument> {
    const createdCustomer = new this.customerModel();
    createdCustomer.address = createCustomerInput.address;
    createdCustomer.company = createCustomerInput.company;
    createdCustomer.email = createCustomerInput.email;
    createdCustomer.fullName = createCustomerInput.fullName;
    createdCustomer.notes = createCustomerInput.notes;
    createdCustomer.phone = createCustomerInput.phone;

    return await createdCustomer.save();
  }

  async update(
    id: string,
    updateCustomerInput: UpdateCustomerInput,
  ): Promise<CustomerDocument> {
    const found = await this.findOne(id);
    if (updateCustomerInput.address)
      found.address = updateCustomerInput.address;

    if (updateCustomerInput.company)
      found.company = updateCustomerInput.company;

    if (updateCustomerInput.email) found.email = updateCustomerInput.email;

    if (updateCustomerInput.fullName)
      found.fullName = updateCustomerInput.fullName;

    if (updateCustomerInput.notes) found.notes = updateCustomerInput.notes;

    if (updateCustomerInput.phone) found.phone = updateCustomerInput.phone;

    await found.save();

    return await this.findOne(id);
  }
}
