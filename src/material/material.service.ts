import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMaterialInput } from './dto/create-material.input';
import { UpdateMaterialInput } from './dto/update-material.input';
import { Material, MaterialDocument } from './entities/material.entity';
import { AbstractService } from '../_core';

@Injectable()
export class MaterialService extends AbstractService<MaterialDocument> {
  constructor(
    @InjectModel(Material.name) private materialModel: Model<MaterialDocument>,
  ) {
    super(materialModel);
  }

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
}
