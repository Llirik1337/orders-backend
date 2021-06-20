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

    if (this.validateProperty(createCustomerInput?.address)) {
      createdCustomer.address = createCustomerInput.address;
    }

    if (this.validateProperty(createCustomerInput?.company)) {
      createdCustomer.company = createCustomerInput.company;
    }

    if (this.validateProperty(createCustomerInput?.email)) {
      createdCustomer.email = createCustomerInput.email;
    }

    if (this.validateProperty(createCustomerInput.fullName)) {
      createdCustomer.fullName = createCustomerInput.fullName;
    }

    if (this.validateProperty(createCustomerInput.notes)) {
      createdCustomer.notes = createCustomerInput.notes;
    }

    if (this.validateProperty(createCustomerInput.phone)) {
      createdCustomer.phone = createCustomerInput.phone;
    }

    return await createdCustomer.save();
  }

  async update(
    id: string,
    updateCustomerInput: UpdateCustomerInput,
  ): Promise<CustomerDocument> {
    const found = await this.findOne(id);

    if (this.validateProperty(updateCustomerInput?.address)) {
      found.address = updateCustomerInput.address;
    }

    if (this.validateProperty(updateCustomerInput?.company)) {
      found.company = updateCustomerInput.company;
    }

    if (this.validateProperty(updateCustomerInput?.email)) {
      found.email = updateCustomerInput.email;
    }

    if (this.validateProperty(updateCustomerInput?.fullName)) {
      found.fullName = updateCustomerInput.fullName;
    }

    if (this.validateProperty(updateCustomerInput?.notes)) {
      found.notes = updateCustomerInput.notes;
    }

    if (this.validateProperty(updateCustomerInput?.phone)) {
      found.phone = updateCustomerInput.phone;
    }

    return await found.save();
  }
}
