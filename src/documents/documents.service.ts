import { Injectable } from '@nestjs/common';
import { OrderDocument } from 'src/order/entities/order.entity';
import { OrderService } from 'src/order/order.service';
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextDirection,
  TextRun,
  VerticalAlign,
  WidthType,
} from 'docx';
import { OrderComponentDocument } from 'src/order-component/entities/order-component.entity';

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

  getDocumentTableHeader() {
    const number = new TableCell({
      children: [
        new Paragraph({
          children: [new TextRun({ text: '№ п/п', bold: true })],
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
    });

    const componentName = new TableCell({
      children: [
        new Paragraph({
          children: [new TextRun({ text: 'Наименование детали', bold: true })],
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
    });

    const count = new TableCell({
      children: [
        new Paragraph({
          children: [new TextRun({ text: 'Кол-во, шт.', bold: true })],
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
    });
    const costOfOneWithOutNDC = new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({ text: 'Цена за ед. без НДС, руб', bold: true }),
          ],
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
    });
    const costWithOutNDC = new TableCell({
      children: [
        new Paragraph({
          children: [new TextRun({ text: 'Сумма без НДС, руб.', bold: true })],
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
    });
    const costNDC = new TableCell({
      children: [
        new Paragraph({
          children: [new TextRun({ text: 'НДС 20%, руб.', bold: true })],
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
    });
    const costWithNDC = new TableCell({
      children: [
        new Paragraph({
          children: [new TextRun({ text: 'Сумма с НДС, руб.', bold: true })],
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
    });

    const header = new TableRow({
      children: [
        number,
        componentName,
        count,
        costOfOneWithOutNDC,
        costWithOutNDC,
        costNDC,
        costWithNDC,
      ],
    });

    return header;
  }

  getComponentRow(orderComponent: OrderComponentDocument) {
    const componentName = new TableCell({
      children: [new Paragraph(orderComponent.component.name)],
      verticalAlign: VerticalAlign.CENTER,
    });

    const count = new TableCell({
      children: [new Paragraph(String(orderComponent.count))],
      verticalAlign: VerticalAlign.CENTER,
    });
    const costOfOneWithOutNDC = new TableCell({
      children: [new Paragraph(String(orderComponent.component.cost))],
      verticalAlign: VerticalAlign.CENTER,
    });
    const costWithOutNDC = new TableCell({
      children: [new Paragraph(String(orderComponent.cost))],
      verticalAlign: VerticalAlign.CENTER,
    });

    const fullCost = orderComponent.cost * 1.2;

    const costWithNDC = new TableCell({
      children: [new Paragraph(String(fullCost))],
      verticalAlign: VerticalAlign.CENTER,
    });
    const costNDC = new TableCell({
      children: [new Paragraph(String(fullCost - orderComponent.cost))],
      verticalAlign: VerticalAlign.CENTER,
    });
    return [
      componentName,
      count,
      costOfOneWithOutNDC,
      costWithOutNDC,
      costNDC,
      costWithNDC,
    ];
  }

  getResultRow(order: OrderDocument) {
    const result = new TableCell({
      children: [
        new Paragraph({
          children: [new TextRun({ text: 'Итого', bold: true })],
        }),
      ],
      columnSpan: 4,
    });

    const costWithOutNDC = new TableCell({
      children: [
        new Paragraph({
          children: [new TextRun({ text: String(order.cost), bold: true })],
        }),
      ],
    });

    const fullCost = order.cost * 1.2;

    const costWithNDC = new TableCell({
      children: [
        new Paragraph({
          children: [new TextRun({ text: String(fullCost), bold: true })],
        }),
      ],
    });
    const costNDC = new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({ text: String(fullCost - order.cost), bold: true }),
          ],
        }),
      ],
    });
    return [result, costWithOutNDC, costNDC, costWithNDC];
  }

  getDocument(order: OrderDocument) {
    const rows = order.orderComponents.map(
      (orderComponent, index) =>
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({ children: [new TextRun(String(index + 1))] }),
              ],
            }),
            ...this.getComponentRow(orderComponent),
          ],
        }),
    );

    const document = new Document({
      sections: [
        {
          children: [
            new Table({
              columnWidths: [500, 2000, 500, 1000, 1000, 1000, 1000],
              rows: [
                this.getDocumentTableHeader(),
                ...rows,
                new TableRow({ children: this.getResultRow(order) }),
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
