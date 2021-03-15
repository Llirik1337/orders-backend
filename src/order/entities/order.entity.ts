import { ObjectType, Field, Int } from '@nestjs/graphql';
// import { Customer } from 'src/customer/entities/customer.entity';
import {
  Entity,
  // ObjectID,
  ObjectIdColumn,
  // PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';

export enum OrderStatus {
  CREATE = 'КП Создано',
  SENT = 'NOT_PAID',
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

  @Field()
  status: OrderStatus;
}
