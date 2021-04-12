import { Injectable } from '@nestjs/common';
import { OrderDocument } from 'src/order/entities/order.entity';
import { OrderService } from 'src/order/order.service';
import { Document, Packer, Paragraph, Table, TableCell, TableRow } from 'docx';
import { CreateDocumentInput } from './dto/create-document.input';
import { UpdateDocumentInput } from './dto/update-document.input';

@Injectable()
export class DocumentsService {
  constructor(private readonly orderService: OrderService) {}
  // create(createDocumentInput: CreateDocumentInput) {
  //   return 'This action adds a new document';
  // }

  // findAll() {
  //   return `This action returns all documents`;
  // }

  async getByOrder(id: string) {
    try {
      const order = await this.orderService.findOne(id);
      if (!order) return undefined;

      return await Packer.toBase64String(this.getDocument(order));
    } catch (error: unknown) {
      if (error instanceof Error) console.error('Error -> ', error);
    }
  }

  getDocument(order: OrderDocument) {
    const document = new Document({
      sections: [
        {
          children: [
            new Table({
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Hello world',
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        },
      ],
    });
    return document;
  }

  // update(id: number, updateDocumentInput: UpdateDocumentInput) {
  //   return `This action updates a #${id} document`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} document`;
  // }
}
