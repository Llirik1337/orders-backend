import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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
  async findAll(
    @Args('deleted', { type: () => Boolean, defaultValue: false })
    deleted: boolean,
  ) {
    return await this.equipmentService.findAll(deleted);
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
  async recoveryEquipment(@Args('id', { type: () => String }) id: string) {
    return await this.equipmentService.recovery(id);
  }

  @Mutation(() => [Equipment])
  async recoveryEquipments(
    @Args('ids', { type: () => [String] }) ids: string[],
  ) {
    return await this.equipmentService.recoveryList(ids);
  }

  @Mutation(() => Equipment)
  async forceRemoveEquipment(@Args('id', { type: () => String }) id: string) {
    return await this.equipmentService.forceRemove(id);
  }

  @Mutation(() => Equipment)
  async removeEquipment(@Args('id', { type: () => String }) id: string) {
    return await this.equipmentService.remove(id);
  }
}
