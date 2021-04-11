import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateExecutorInput {
  @IsString()
  @Field(() => String, { nullable: false })
  name: string;
}
