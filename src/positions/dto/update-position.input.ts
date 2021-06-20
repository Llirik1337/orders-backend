import { CreatePositionInput } from './create-position.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class UpdatePositionInput extends PartialType(CreatePositionInput) {
  @IsMongoId()
  @Field(() => String)
  id: string;
}
