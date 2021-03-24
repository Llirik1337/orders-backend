import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ComponentService } from './component.service';
import { Component } from './entities/component.entity';
import { CreateComponentInput } from './dto/create-component.input';
import { UpdateComponentInput } from './dto/update-component.input';

@Resolver(() => Component)
export class ComponentResolver {
  constructor(private readonly componentService: ComponentService) {}

  @Mutation(() => Component)
  createComponent(@Args('createComponentInput') createComponentInput: CreateComponentInput) {
    return this.componentService.create(createComponentInput);
  }

  @Query(() => [Component], { name: 'component' })
  findAll() {
    return this.componentService.findAll();
  }

  @Query(() => Component, { name: 'component' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.componentService.findOne(id);
  }

  @Mutation(() => Component)
  updateComponent(@Args('updateComponentInput') updateComponentInput: UpdateComponentInput) {
    return this.componentService.update(updateComponentInput.id, updateComponentInput);
  }

  @Mutation(() => Component)
  removeComponent(@Args('id', { type: () => Int }) id: number) {
    return this.componentService.remove(id);
  }
}
