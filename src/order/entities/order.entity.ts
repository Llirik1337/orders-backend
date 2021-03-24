import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Component } from 'src/component/entities/component.entity';
import { Entity, OneToMany } from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';

export enum OrderStatus {
  CREATE = 'КП Создано',
  SENT = 'Не оплачено',
  RENOUNCEMENT = 'Отказ',
  MANUFACTURING = 'Изготовление',
  COMPLETED = 'Исполнен',
}

@ObjectType()
@Entity({})
export class Order {
  @Field(() => Int, { nullable: false, description: 'Id of Customer' })
  id: number;

  @Field(() => String, { nullable: false, description: 'Order name' })
  name: string;

  @Field(() => Customer, { nullable: false, description: 'Order customer' })
  customer: Customer;

  @Field(() => Component, { nullable: false, description: 'Order customer' })
  @OneToMany(() => Component, (component) => component.id)
  components: Component[];

  // @Field()
  // status: OrderStatus;

  //TODO Added calculate price
}
