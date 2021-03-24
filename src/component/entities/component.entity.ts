import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Operation } from 'src/operation/entities/operation.entity';
import { Order } from 'src/order/entities/order.entity';
import { OneToMany } from 'typeorm';

@ObjectType()
export class Component {
  @Field(() => Int, { nullable: false, description: 'Id of Customer' })
  id: number;

  @Field(() => String, { nullable: false, description: 'notes' })
  name: string;

  @Field(() => String, { nullable: false, description: 'notes' })
  notes: string;

  @Field(() => Order, { nullable: false, description: 'notes' })
  @OneToMany(() => Order, (order) => order.id)
  order: Order[];

  @Field(() => Operation, { nullable: false, description: 'notes' })
  @OneToMany(() => Operation, (operation) => operation.id)
  operations: Operation[];
}
