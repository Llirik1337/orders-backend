import { Args, Query, Resolver } from '@nestjs/graphql';
import { DocumentsService } from './documents.service';
import { Document } from './entities/document.entity';

@Resolver(() => Document)
export class DocumentsResolver {
  constructor(private readonly documentsService: DocumentsService) {}

  // @Mutation(() => Document)
  // createDocument(@Args('createDocumentInput') createDocumentInput: CreateDocumentInput) {
  //   return this.documentsService.create(createDocumentInput);
  // }

  // @Query(() => [Document], { name: 'documents' })
  // findAll() {
  //   return this.documentsService.findAll();
  // }

  @Query(() => Document, { name: 'document' })
  async getByOrder(@Args('orderId', { type: () => String }) id: string) {
    const body = await this.documentsService.getByOrder(id);
    return { body };
  }

  // @Mutation(() => Document)
  // updateDocument(@Args('updateDocumentInput') updateDocumentInput: UpdateDocumentInput) {
  //   return this.documentsService.update(updateDocumentInput.id, updateDocumentInput);
  // }

  // @Mutation(() => Document)
  // removeDocument(@Args('id', { type: () => Int }) id: number) {
  //   return this.documentsService.remove(id);
  // }
}
