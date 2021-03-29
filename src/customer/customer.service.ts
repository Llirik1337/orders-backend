import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model } from 'mongoose';
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
    return await this.customerModel.find().exec();
  }

  async findById(id: string): Promise<CustomerDocument> {
    return await this.customerModel.findById(id);
  }

  async update(
    id: string,
    updateCustomerInput: UpdateCustomerInput,
  ): Promise<CustomerDocument> {
    return await this.customerModel.findByIdAndUpdate(id, updateCustomerInput);
  }

  async remove(id: string): Promise<CustomerDocument> {
    return await this.customerModel.findByIdAndRemove(id);
  }
}
