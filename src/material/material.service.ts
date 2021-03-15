import { Injectable } from '@nestjs/common';
import { CreateMaterialInput } from './dto/create-material.input';
import { UpdateMaterialInput } from './dto/update-material.input';
import { Material } from './entities/material.entity';

let materials: Material[] = [];

// Да сука обычный for. ВО - первых нахуй иди, один тут работаю за двоих,
// а во - вторых, хули ты мне сделаешь, в третьих за мат извини
for (let i = 1; i <= 60; ++i) {
  materials.push({
    id: i,
    name: `Наименование ${i}`,
    units: `${i}0 мм`,
    cost: i * 1000,
    isAvailable: i % 2 == 0,
  });
}

let maxIdMaterials = 60;

@Injectable()
export class MaterialService {
  create(createMaterialInput: CreateMaterialInput) {
    return 'This action adds a new material';
  }

  findAll() {
    return materials;
  }

  findOne(id: number) {
    return `This action returns a #${id} material`;
  }

  update(id: number, updateMaterialInput: UpdateMaterialInput) {
    return `This action updates a #${id} material`;
  }

  remove(id: number) {
    return `This action removes a #${id} material`;
  }
}
