import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateEquipmentInput {
  @Field(() => String, {
    nullable: false,
    description: 'Name of Equipment',
  })
  name: string;

  @Field(() => String, { defaultValue: '', description: 'Notes of Equipment' })
  notes: string;

  @Field(() => Int, { defaultValue: 0, description: 'Count of Equipment' })
  count: number;

  // TODO Добавить поле "Доступные операции"
  // @Field(() => Operation, {
  //   description: 'Count of Equipment',
  // })
  // operations: OperationDocument[];
}
