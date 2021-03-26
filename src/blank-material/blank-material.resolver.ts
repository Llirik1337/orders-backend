import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BlankMaterialService } from './blank-material.service';
import { CreateBlankMaterialInput } from './dto/create-blank-material.input';
import { UpdateBlankMaterialInput } from './dto/update-blank-material.input';
import { BlankMaterial } from './entities/blank-material.entity';

@Resolver(() => BlankMaterial)
export class BlankMaterialResolver {
  constructor(private readonly blankMaterialService: BlankMaterialService) {}

  @Mutation(() => BlankMaterial)
  async createBlankMaterial(
    @Args('createBlankMaterialInput')
    createBlankMaterialInput: CreateBlankMaterialInput,
  ) {
    return await this.blankMaterialService.create(createBlankMaterialInput);
  }

  @Query(() => [BlankMaterial], { name: 'blankMaterials' })
  async findAll() {
    return await this.blankMaterialService.findAll();
  }

  @Query(() => BlankMaterial, { name: 'blankMaterial' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.blankMaterialService.findOne(id);
  }

  @Mutation(() => BlankMaterial)
  async updateBlankMaterial(
    @Args('updateBlankMaterialInput')
    updateBlankMaterialInput: UpdateBlankMaterialInput,
  ) {
    return await this.blankMaterialService.update(
      updateBlankMaterialInput.id,
      updateBlankMaterialInput,
    );
  }

  @Mutation(() => BlankMaterial)
  async removeBlankMaterial(@Args('id', { type: () => String }) id: string) {
    return await this.blankMaterialService.remove(id);
  }
}
