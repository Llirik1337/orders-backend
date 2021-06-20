import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateCustomerInput {
  @IsString()
  @Field(() => String, { nullable: false })
  fullName: string;

  @IsString()
  @Field(() => String, { nullable: false })
  company: string;

  @IsString()
  @Field(() => String, { nullable: true })
  email?: string;

  @IsString()
  @Field(() => String, { nullable: true })
  phone?: string;

  @IsString()
  @Field(() => String, { nullable: true })
  address?: string;

  @IsString()
  @Field(() => String, { nullable: true })
  notes?: string;
}
