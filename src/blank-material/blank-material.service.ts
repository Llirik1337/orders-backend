import { Injectable } from '@nestjs/common';
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
    const material = await this.materialService.findById(
      createBlankMaterialInput.materialId,
    );
    createdBlankMaterial.material = material;
    await createdBlankMaterial.save();
    await this.updateBlankMaterialCost(createdBlankMaterial);
    return createdBlankMaterial;
  }
  async findAll() {
    const res = await this.blankMaterialModel.find().exec();
    return res;
  }

  async findOne(id: string) {
    return await this.blankMaterialModel.findById(id);
  }

  async update(id: string, updateBlankMaterialInput: UpdateBlankMaterialInput) {
    const updatedBlankMaterial = await this.blankMaterialModel.findById(id);
    if (updateBlankMaterialInput.length)
      updatedBlankMaterial.length = updateBlankMaterialInput.length;
    if (updateBlankMaterialInput.width)
      updatedBlankMaterial.width = updateBlankMaterialInput.width;
    if (updateBlankMaterialInput.materialId) {
      const material = await this.materialService.findById(
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

    populatedBlank.cost = cost;
    populatedBlank.diff = diff;

    console.log(cost, diff);

    await populatedBlank.save();
    return populatedBlank;
  }

  async remove(id: string) {
    return this.blankMaterialModel.findByIdAndRemove(id);
  }
}
