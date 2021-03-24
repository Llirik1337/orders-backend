import { Injectable } from '@nestjs/common';
import { CreateOperationInput } from './dto/create-operation.input';
import { UpdateOperationInput } from './dto/update-operation.input';

@Injectable()
export class OperationService {
  create(createOperationInput: CreateOperationInput) {
    return 'This action adds a new operation';
  }

  findAll() {
    return `This action returns all operation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} operation`;
  }

  update(id: number, updateOperationInput: UpdateOperationInput) {
    return `This action updates a #${id} operation`;
  }

  remove(id: number) {
    return `This action removes a #${id} operation`;
  }
}
