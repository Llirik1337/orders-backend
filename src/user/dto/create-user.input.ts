import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Login' })
  login: string;
  @Field(() => String, { description: 'Password' })
  password: string;
}
