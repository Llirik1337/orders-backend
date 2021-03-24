import { Injectable } from '@nestjs/common';
import { CreateEquipmentInput } from './dto/create-equipment.input';
import { UpdateEquipmentInput } from './dto/update-equipment.input';

@Injectable()
export class EquipmentService {
  create(createEquipmentInput: CreateEquipmentInput) {
    return 'This action adds a new equipment';
  }

  findAll() {
    return `This action returns all equipment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipment`;
  }

  update(id: number, updateEquipmentInput: UpdateEquipmentInput) {
    return `This action updates a #${id} equipment`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipment`;
  }
}
