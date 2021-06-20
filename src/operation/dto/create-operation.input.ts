import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateOperationInput {
  @IsString()
  @Field(() => String, { nullable: false })
  name: string;

  @IsNumber()
  @Field(() => Number, { nullable: false })
  price: number;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  notes?: string;
}
