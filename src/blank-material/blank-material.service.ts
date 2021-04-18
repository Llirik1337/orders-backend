import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MaterialService } from 'src/material/material.service';
import { CreateBlankMaterialInput } from './dto/create-blank-material.input';
import { UpdateBlankMaterialInput } from './dto/update-blank-material.input';
import {
  BlankMaterial,
  BlankMaterialDocument,
} from './entities/blank-material.entity';

@Injectable()
export class BlankMaterialService {
  constructor(
    @InjectModel(BlankMaterial.name)
    private readonly blankMaterialModel: Model<BlankMaterialDocument>,
    private readonly materialService: MaterialService,
  ) {}
  async create(createBlankMaterialInput: CreateBlankMaterialInput) {
    const createdBlankMaterial = new this.blankMaterialModel();
    createdBlankMaterial.length = createBlankMaterialInput.length;
    createdBlankMaterial.width = createBlankMaterialInput.width;
    createdBlankMaterial.name = createBlankMaterialInput.name;

    const material = await this.materialService.findOne(
      createBlankMaterialInput.materialId,
    );
    createdBlankMaterial.material = material;
    await createdBlankMaterial.save();
    await this.updateBlankMaterialCost(createdBlankMaterial);
    return createdBlankMaterial;
  }
  async findAll() {
    const res = await this.blankMaterialModel
      .find()
      .lean({ autopopulate: true });
    return res;
  }

  async findOne(id: string) {
    const foundBlankMaterial = await this.blankMaterialModel.findById(id);
    if (!foundBlankMaterial)
      throw new NotFoundException({
        message: `BlankMaterial not found by ${id}`,
      });
    return foundBlankMaterial;
  }

  async update(id: string, updateBlankMaterialInput: UpdateBlankMaterialInput) {
    const updatedBlankMaterial = await this.findOne(id);

    if (updateBlankMaterialInput.length)
      updatedBlankMaterial.length = updateBlankMaterialInput.length;
    if (updateBlankMaterialInput.width)
      updatedBlankMaterial.width = updateBlankMaterialInput.width;
    if (updateBlankMaterialInput.name)
      updatedBlankMaterial.name = updateBlankMaterialInput.name;
    if (updateBlankMaterialInput.materialId) {
      const material = await this.materialService.findOne(
        updateBlankMaterialInput.materialId,
      );
      updatedBlankMaterial.material = material;
    }
    await updatedBlankMaterial.save();
    await this.updateBlankMaterialCost(updatedBlankMaterial);
    return updatedBlankMaterial;
  }

  async updateBlankMaterialCost(blank: BlankMaterialDocument) {
    const populatedBlank = await blank.populate('material').execPopulate();
    console.log(populatedBlank);

    const diff =
      (populatedBlank.width * populatedBlank.length) /
      (populatedBlank.material.width * populatedBlank.material.length);
    const cost = diff * populatedBlank.material.cost;

    populatedBlank.cost = Number(cost.toFixed(2));
    populatedBlank.diff = diff;

    console.log(cost, diff);

    await populatedBlank.save();
    return populatedBlank;
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await found.delete();
    return found;
  }
}
