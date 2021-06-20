import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCustomerInput {
  @IsString()
  @Field(() => String, { nullable: false })
  fullName: string;

  @IsString()
  @Field(() => String, { nullable: false })
  company: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  email?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  phone?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  address?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  notes?: string;
}
