import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model } from 'mongoose';
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
    createdEquipment.count = createEquipmentInput.count;
    createdEquipment.name = createEquipmentInput.name;
    createdEquipment.notes = createEquipmentInput.notes;
    return await createdEquipment.save();
  }

  async findAll(): Promise<LeanDocument<EquipmentDocument>> {
    return await this.equipmentModel.find().lean();
  }

  async findById(id: string): Promise<EquipmentDocument> {
    return await this.equipmentModel.findById(id);
  }

  async update(
    id: string,
    updateEquipmentInput: UpdateEquipmentInput,
  ): Promise<EquipmentDocument> {
    return await this.equipmentModel.findByIdAndUpdate(
      id,
      updateEquipmentInput,
    );
  }

  async remove(id: string): Promise<EquipmentDocument> {
    return await this.equipmentModel.findByIdAndRemove(id);
  }
}
