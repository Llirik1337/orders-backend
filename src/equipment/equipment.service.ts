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

    if (createEquipmentInput.count)
      createdEquipment.count = createEquipmentInput.count;

    if (createEquipmentInput.name)
      createdEquipment.name = createEquipmentInput.name;

    if (createEquipmentInput.specifications)
      createdEquipment.specifications = createEquipmentInput.specifications;

    if (createEquipmentInput.notes)
      createdEquipment.notes = createEquipmentInput.notes;

    if (createEquipmentInput.releaseYear)
      createdEquipment.releaseYear = createEquipmentInput.releaseYear;
    if (createEquipmentInput.notes)
      createdEquipment.notes = createEquipmentInput.notes;

    return await createdEquipment.save();
  }

  async update(
    id: string,
    updateEquipmentInput: UpdateEquipmentInput,
  ): Promise<EquipmentDocument> {
    const found = await this.findOne(id);

    if (updateEquipmentInput.count) found.count = updateEquipmentInput.count;

    if (updateEquipmentInput.name) found.name = updateEquipmentInput.name;

    if (updateEquipmentInput.notes) found.notes = updateEquipmentInput.notes;

    if (updateEquipmentInput.specifications)
      found.specifications = updateEquipmentInput.specifications;

    if (updateEquipmentInput.releaseYear)
      found.releaseYear = updateEquipmentInput.releaseYear;

    await found.save();
    return await this.findOne(id);
  }
}
