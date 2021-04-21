import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { leanOptions } from 'src/common';
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

  async findAll() {
    return await this.materialModel.find().lean(leanOptions);
  }

  async findOne(id: string): Promise<MaterialDocument> {
    const found = await this.materialModel.findById(id);
    if (!found)
      throw new NotFoundException({
        message: `Material not found by id ${id}`,
      });
    return found;
  }

  async update(
    id: string,
    updateMaterialInput: UpdateMaterialInput,
  ): Promise<MaterialDocument> {
    const found = await this.findOne(id);
    if (updateMaterialInput.cost) found.cost = updateMaterialInput.cost;

    if (updateMaterialInput.count) found.count = updateMaterialInput.count;

    if (updateMaterialInput.length) found.length = updateMaterialInput.length;

    if (updateMaterialInput.name) found.name = updateMaterialInput.name;

    if (updateMaterialInput.width) found.width = updateMaterialInput.width;

    await found.save();

    return await this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await found.delete();
    return found;
  }
}
