import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateOperationInput {
  @IsString()
  @Field(() => String, { nullable: false })
  name: string;

  @IsNumber()
  @Field(() => Number, { nullable: false })
  price: number;

  @IsString()
  @Field(() => String, { nullable: true })
  notes?: string;
}
