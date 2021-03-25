import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMaterialInput } from './dto/create-material.input';
import { UpdateMaterialInput } from './dto/update-material.input';
import { Material, MaterialDocument } from './entities/material.entity';

@Injectable()
export class MaterialService {
  constructor(
    @InjectModel(Material.name) private materialModel: Model<MaterialDocument>,
  ) {}
  async create(
    createMaterialInput: CreateMaterialInput,
  ): Promise<MaterialDocument> {
    const createdMaterial = new this.materialModel();
    createdMaterial.name = createMaterialInput.name;
    createdMaterial.cost = createMaterialInput.cost;
    createdMaterial.count = createMaterialInput.count;
    createdMaterial.length = createMaterialInput.length;
    createdMaterial.width = createMaterialInput.width;
    return await createdMaterial.save();
  }

  async findAll(): Promise<Array<MaterialDocument>> {
    return this.materialModel.find().lean();
  }

  async findById(id: string): Promise<MaterialDocument> {
    return await this.materialModel.findById(id);
  }

  async update(
    id: string,
    updateMaterialInput: UpdateMaterialInput,
  ): Promise<MaterialDocument> {
    return await this.materialModel
      .findByIdAndUpdate(id, updateMaterialInput)
      .exec();
  }

  async remove(id: string) {
    return await this.materialModel.findByIdAndRemove(id).exec();
  }
}
