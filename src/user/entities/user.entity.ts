import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int, { nullable: false, description: 'Id of Customer' })
  id: number;

  @Field(() => String, { description: 'Login' })
  login: number;

  @Field(() => String, { description: 'Password' })
  password: number;
}
