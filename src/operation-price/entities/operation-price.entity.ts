import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Component } from 'src/component/entities/component.entity';
import { Employee } from 'src/employee/entities/employee.entity';
import { Operation } from 'src/operation/entities/operation.entity';
import { Entity } from 'typeorm';

@ObjectType()
@Entity({})
export class OperationPrice {
  @Field(() => Int, { nullable: false, description: 'Id of Customer' })
  id: number;

  @Field(() => String, { nullable: false, description: 'notes' })
  notes: string;

  @Field(() => Int, { nullable: false, description: 'notes' })
  count: number;

  @Field(() => Operation, { nullable: false, description: 'notes' })
  operation: Operation;

  @Field(() => Component, { nullable: false, description: 'notes' })
  component: Component;

  @Field(() => Employee, { nullable: false, description: 'notes' })
  responsible: Employee;
}
