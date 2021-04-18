import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateEquipmentInput {
  @IsString()
  @Field(() => String, {
    nullable: false,
    description: 'Name of Equipment',
  })
  name: string;

  @IsString()
  @Field(() => String, {
    nullable: true,
    defaultValue: '',
    description: 'Notes of Equipment',
  })
  notes?: string;

  @Field(() => Int, { defaultValue: 0, nullable: true })
  releaseYear?: number;

  @IsNumber()
  @Field(() => Int, { defaultValue: 0, description: 'Count of Equipment' })
  count: number;

  // TODO Добавить поле "Доступные операции"
  // @Field(() => Operation, {
  //   description: 'Count of Equipment',
  // })
  // operations: OperationDocument[];
}
