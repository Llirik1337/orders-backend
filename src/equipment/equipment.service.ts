import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEquipmentInput } from './dto/create-equipment.input';
import { UpdateEquipmentInput } from './dto/update-equipment.input';
import { Equipment, EquipmentDocument } from './entities/equipment.entity';
import { AbstractService } from '../_core';

@Injectable()
export class EquipmentService extends AbstractService<EquipmentDocument> {
  constructor(
    @InjectModel(Equipment.name)
    private equipmentModel: Model<EquipmentDocument>,
  ) {
    super(equipmentModel);
  }

  async create(
    createEquipmentInput: CreateEquipmentInput,
  ): Promise<EquipmentDocument> {
    const createdEquipment = new this.equipmentModel();

    if (this.validateProperty(createEquipmentInput?.count)) {
      createdEquipment.count = createEquipmentInput.count;
    }

    if (this.validateProperty(createEquipmentInput?.name)) {
      createdEquipment.name = createEquipmentInput.name;
    }

    if (this.validateProperty(createEquipmentInput?.specifications)) {
      createdEquipment.specifications = createEquipmentInput.specifications;
    }

    if (this.validateProperty(createEquipmentInput?.notes)) {
      createdEquipment.notes = createEquipmentInput.notes;
    }

    if (this.validateProperty(createEquipmentInput?.releaseYear)) {
      createdEquipment.releaseYear = createEquipmentInput.releaseYear;
    }

    if (this.validateProperty(createEquipmentInput?.notes)) {
      createdEquipment.notes = createEquipmentInput.notes;
    }

    return await createdEquipment.save();
  }

  async update(
    id: string,
    updateEquipmentInput: UpdateEquipmentInput,
  ): Promise<EquipmentDocument> {
    const found = await this.findOne(id);

    if (this.validateProperty(updateEquipmentInput?.count)) {
      found.count = updateEquipmentInput.count;
    }

    if (this.validateProperty(updateEquipmentInput?.name)) {
      found.name = updateEquipmentInput.name;
    }

    if (this.validateProperty(updateEquipmentInput?.notes)) {
      found.notes = updateEquipmentInput.notes;
    }

    if (this.validateProperty(updateEquipmentInput?.specifications)) {
      found.specifications = updateEquipmentInput.specifications;
    }

    if (this.validateProperty(updateEquipmentInput?.releaseYear)) {
      found.releaseYear = updateEquipmentInput.releaseYear;
    }

    return await found.save();
  }
}
