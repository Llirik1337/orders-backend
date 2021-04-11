import { CreateExecutorInput } from './create-executor.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateExecutorInput extends PartialType(CreateExecutorInput) {
  @Field(() => String)
  id: string;
}
