import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Employee {
  @Field(() => Int, { nullable: false, description: 'Id of employee' })
  id: number;

  @Field(() => String)
  fullName: string;

  @Field(() => String)
  position: string;
}
