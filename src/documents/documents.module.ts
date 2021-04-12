import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsResolver } from './documents.resolver';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [OrderModule],
  providers: [DocumentsResolver, DocumentsService],
  exports: [DocumentsService],
})
export class DocumentsModule {}
