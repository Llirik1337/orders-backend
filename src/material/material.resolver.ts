import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MaterialService } from './material.service';
import { Material } from './entities/material.entity';
import { CreateMaterialInput } from './dto/create-material.input';
import { UpdateMaterialInput } from './dto/update-material.input';

@Resolver(() => Material)
export class MaterialResolver {
  constructor(private readonly materialService: MaterialService) {}

  @Mutation(() => Material)
  async createMaterial(
    @Args('createMaterialInput') createMaterialInput: CreateMaterialInput,
  ) {
    return await this.materialService.create(createMaterialInput);
  }

  @Query(() => [Material], { name: 'materials' })
  async findAll() {
    return await this.materialService.findAll();
  }

  @Query(() => Material, { name: 'material' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.materialService.findOne(id);
  }

  @Mutation(() => Material)
  async updateMaterial(
    @Args('updateMaterialInput') updateMaterialInput: UpdateMaterialInput,
  ) {
    return await this.materialService.update(
      updateMaterialInput.id,
      updateMaterialInput,
    );
  }

  @Mutation(() => Material)
  async removeMaterial(@Args('id', { type: () => String }) id: string) {
    return await this.materialService.remove(id);
  }
}
