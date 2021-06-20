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

    if (this.validateProperty(createMaterialInput?.name)) {
      createdMaterial.name = createMaterialInput.name;
    }

    if (this.validateProperty(createMaterialInput?.cost)) {
      createdMaterial.cost = createMaterialInput.cost;
    }

    if (this.validateProperty(createMaterialInput?.count)) {
      createdMaterial.count = createMaterialInput.count;
    }

    if (this.validateProperty(createMaterialInput?.length)) {
      createdMaterial.length = createMaterialInput.length;
    }

    if (this.validateProperty(createMaterialInput?.width)) {
      createdMaterial.width = createMaterialInput.width;
    }

    return await createdMaterial.save();
  }

  async update(
    id: string,
    updateMaterialInput: UpdateMaterialInput,
  ): Promise<MaterialDocument> {
    const found = await this.findOne(id);

    if (this.validateProperty(updateMaterialInput?.cost)) {
      found.cost = updateMaterialInput.cost;
    }

    if (this.validateProperty(updateMaterialInput?.count)) {
      found.count = updateMaterialInput.count;
    }

    if (this.validateProperty(updateMaterialInput?.length)) {
      found.length = updateMaterialInput.length;
    }

    if (this.validateProperty(updateMaterialInput?.name)) {
      found.name = updateMaterialInput.name;
    }

    if (this.validateProperty(updateMaterialInput?.width)) {
      found.width = updateMaterialInput.width;
    }

    return await found.save();
  }
}
