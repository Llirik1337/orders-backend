import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EquipmentService } from './equipment.service';
import { Equipment } from './entities/equipment.entity';
import { CreateEquipmentInput } from './dto/create-equipment.input';
import { UpdateEquipmentInput } from './dto/update-equipment.input';

@Resolver(() => Equipment)
export class EquipmentResolver {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Mutation(() => Equipment)
  createEquipment(@Args('createEquipmentInput') createEquipmentInput: CreateEquipmentInput) {
    return this.equipmentService.create(createEquipmentInput);
  }

  @Query(() => [Equipment], { name: 'equipment' })
  findAll() {
    return this.equipmentService.findAll();
  }

  @Query(() => Equipment, { name: 'equipment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.equipmentService.findOne(id);
  }

  @Mutation(() => Equipment)
  updateEquipment(@Args('updateEquipmentInput') updateEquipmentInput: UpdateEquipmentInput) {
    return this.equipmentService.update(updateEquipmentInput.id, updateEquipmentInput);
  }

  @Mutation(() => Equipment)
  removeEquipment(@Args('id', { type: () => Int }) id: number) {
    return this.equipmentService.remove(id);
  }
}
