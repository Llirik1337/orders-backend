import { InputType, Int, Field } from '@nestjs/graphql';
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
  @Field(() => String, { nullable: false })
  email: string;

  @IsString()
  @Field(() => String, { nullable: false })
  phone: string;

  @IsString()
  @Field(() => String, { nullable: false })
  address: string;

  @IsString()
  @Field(() => String, { nullable: true })
  notes?: string;
}
