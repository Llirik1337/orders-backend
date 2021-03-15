import { Injectable } from '@nestjs/common';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { Customer } from './entities/customer.entity';

export let customers: Customer[] = [];

// Да сука обычный for. ВО - первых нахуй иди, один тут работаю за двоих,
// а во - вторых, хули ты мне сделаешь, в третьих за мат извини
for (let i = 1; i <= 60; ++i) {
  customers.push({
    id: i,
    fullName: `Заказчик ${i}`,
    company: `Компания ${i}`,
    notes: '',
  });
}

let maxIdCustomers = 60;

@Injectable()
export class CustomerService {
  create(createCustomerInput: CreateCustomerInput) {
    const item = new Customer();

    item.id = ++maxIdCustomers;
    item.fullName = createCustomerInput.fullName;

    customers.push(item);

    return item;
  }

  findAll() {
    return customers;
  }

  findOne(id: number) {
    return customers.find((item) => item.id === id);
  }

  update(id: number, updateCustomerInput: UpdateCustomerInput) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
