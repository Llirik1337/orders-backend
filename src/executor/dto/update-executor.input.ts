import { CreateExecutorInput } from './create-executor.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class UpdateExecutorInput extends PartialType(CreateExecutorInput) {
  @IsMongoId()
  @Field(() => String)
  id: string;
}
