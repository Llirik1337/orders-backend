import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { leanOptions } from 'src/common';
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
    const blank = new this.blankMaterialModel();
    blank.length = createBlankMaterialInput.length;
    blank.width = createBlankMaterialInput.width;

    const material = await this.materialService.findOne(
      createBlankMaterialInput.materialId,
    );
    blank.material = material;
    blank.diff =
      (blank.width * blank.length) /
      (blank.material.width * blank.material.length);
    await blank.save();
    return blank;
  }
  async findAll() {
    const res = await this.blankMaterialModel.find().lean(leanOptions);
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
    const blank = await this.findOne(id);

    if (updateBlankMaterialInput.length)
      blank.length = updateBlankMaterialInput.length;
    if (updateBlankMaterialInput.width)
      blank.width = updateBlankMaterialInput.width;
    if (updateBlankMaterialInput.materialId) {
      const material = await this.materialService.findOne(
        updateBlankMaterialInput.materialId,
      );
      blank.material = material;
    }

    blank.diff =
      (blank.width * blank.length) /
      (blank.material.width * blank.material.length);

    await blank.save();
    return blank;
  }
  async remove(id: string) {
    const found = await this.findOne(id);
    await found.delete();
    return found;
  }
}
