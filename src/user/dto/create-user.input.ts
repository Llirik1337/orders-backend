import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @Field(() => String, { description: 'Login' })
  login: string;

  @IsString()
  @Field(() => String, { description: 'Password' })
  password: string;
}
