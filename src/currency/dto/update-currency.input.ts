import { CreateCurrencyInput } from './create-currency.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class UpdateCurrencyInput extends PartialType(CreateCurrencyInput) {
  @IsMongoId()
  @Field(() => String)
  id: string;
}
