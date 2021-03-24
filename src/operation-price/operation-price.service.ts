import { Injectable } from '@nestjs/common';
import { CreateOperationPriceInput } from './dto/create-operation-price.input';
import { UpdateOperationPriceInput } from './dto/update-operation-price.input';

@Injectable()
export class OperationPriceService {
  create(createOperationPriceInput: CreateOperationPriceInput) {
    return 'This action adds a new operationPrice';
  }

  findAll() {
    return `This action returns all operationPrice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} operationPrice`;
  }

  update(id: number, updateOperationPriceInput: UpdateOperationPriceInput) {
    return `This action updates a #${id} operationPrice`;
  }

  remove(id: number) {
    return `This action removes a #${id} operationPrice`;
  }
}
