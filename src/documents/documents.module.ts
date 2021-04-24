import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsResolver } from './documents.resolver';
import { OrderModule } from 'src/order/order.module';
import { CalculationsModule } from 'src/calculations/calculations.module';

@Module({
  imports: [OrderModule, CalculationsModule],
  providers: [DocumentsResolver, DocumentsService],
  exports: [DocumentsService],
})
export class DocumentsModule {}
