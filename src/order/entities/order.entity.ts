import { ObjectType, Field } from '@nestjs/graphql';
// import { Customer } from 'src/customer/entities/customer.entity';
import {
  Entity,
  // ObjectID,
  ObjectIdColumn,
  // PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity({})
export class Order {
  @Field(() => String, { nullable: false, description: 'Id of order' })
  @ObjectIdColumn()
  // @PrimaryGeneratedColumn('uuid')
  // id: ObjectID;
  id: string;

  @Field(() => String, { nullable: false, description: 'Order name' })
  name: string;

  // @Field(() => Customer, { nullable: false, description: 'Order customer' })
  // customer: Customer;
}
