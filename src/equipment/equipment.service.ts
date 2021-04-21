import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model } from 'mongoose';
import { leanOptions } from 'src/common';
import { CreateEquipmentInput } from './dto/create-equipment.input';
import { UpdateEquipmentInput } from './dto/update-equipment.input';
import { Equipment, EquipmentDocument } from './entities/equipment.entity';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectModel(Equipment.name)
    private equipmentModel: Model<EquipmentDocument>,
  ) {}
  async create(
    createEquipmentInput: CreateEquipmentInput,
  ): Promise<EquipmentDocument> {
    const createdEquipment = new this.equipmentModel();

    if (createEquipmentInput.count)
      createdEquipment.count = createEquipmentInput.count;
    if (createEquipmentInput.name)
      createdEquipment.name = createEquipmentInput.name;
    if (createEquipmentInput.notes)
      createdEquipment.notes = createEquipmentInput.notes;
    if (createEquipmentInput.releaseYear)
      createdEquipment.releaseYear = createEquipmentInput.releaseYear;

    return await createdEquipment.save();
  }

  async findAll() {
    return await this.equipmentModel.find().lean(leanOptions);
  }

  async findOne(id: string): Promise<EquipmentDocument> {
    const found = await this.equipmentModel.findById(id);
    if (!found)
      throw new NotFoundException({
        message: `Equipment not found by id ${id}`,
      });
    return found;
  }

  async update(
    id: string,
    updateEquipmentInput: UpdateEquipmentInput,
  ): Promise<EquipmentDocument> {
    const found = await this.findOne(id);
    if (updateEquipmentInput.count) found.count = updateEquipmentInput.count;

    if (updateEquipmentInput.name) found.name = updateEquipmentInput.name;

    if (updateEquipmentInput.notes) found.notes = updateEquipmentInput.notes;

    if (updateEquipmentInput.releaseYear)
      found.releaseYear = updateEquipmentInput.releaseYear;

    await found.save();

    return await this.findOne(id);
  }

  async remove(id: string): Promise<EquipmentDocument> {
    const found = await this.findOne(id);
    await found.delete();
    return found;
  }
}
