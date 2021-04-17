import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EquipmentService } from './equipment.service';
import { Equipment } from './entities/equipment.entity';
import { CreateEquipmentInput } from './dto/create-equipment.input';
import { UpdateEquipmentInput } from './dto/update-equipment.input';

@Resolver(() => Equipment)
export class EquipmentResolver {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Mutation(() => Equipment)
  async createEquipment(
    @Args('createEquipmentInput') createEquipmentInput: CreateEquipmentInput,
  ) {
    return await this.equipmentService.create(createEquipmentInput);
  }

  @Query(() => [Equipment], { name: 'equipments' })
  async findAll() {
    return await this.equipmentService.findAll();
  }

  @Query(() => Equipment, { name: 'equipment' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.equipmentService.findOne(id);
  }

  @Mutation(() => Equipment)
  async updateEquipment(
    @Args('updateEquipmentInput') updateEquipmentInput: UpdateEquipmentInput,
  ) {
    return await this.equipmentService.update(
      updateEquipmentInput.id,
      updateEquipmentInput,
    );
  }

  @Mutation(() => Equipment)
  async removeEquipment(@Args('id', { type: () => String }) id: string) {
    return await this.equipmentService.remove(id);
  }
}
