import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity } from 'typeorm';

@ObjectType()
@Entity({})
export class Customer {
  @Field(() => Int, { nullable: false, description: 'Id of Customer' })
  id: number;

  @Field(() => String)
  fullName: string;

  @Field(() => String)
  company: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  address: string;

  @Field(() => String)
  notes: string;
}
