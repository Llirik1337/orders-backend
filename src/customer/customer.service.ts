import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model } from 'mongoose';
import { leanOptions } from 'src/common';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { Customer, CustomerDocument } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {}

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

  async findAll() {
    return await this.customerModel.find().lean(leanOptions);
  }

  async findOne(id: string): Promise<CustomerDocument> {
    const found = await this.customerModel.findById(id);
    if (!found)
      throw new NotFoundException({
        message: `Customer not found by id ${id}`,
      });
    return found;
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

  async remove(id: string): Promise<CustomerDocument> {
    const found = await this.findOne(id);
    await found.delete();
    return found;
  }
}
