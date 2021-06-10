import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateOrderStatusInput {
  @IsString()
  @Field(() => String, { nullable: false })
  name: string;
}
