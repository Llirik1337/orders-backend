import { Injectable } from '@nestjs/common';
import { OrderDocument } from 'src/order/entities/order.entity';
import { OrderService } from 'src/order/order.service';
import {
  AlignmentType,
  BorderStyle,
  Document,
  ImageRun,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
} from 'docx';
import * as moment from 'moment';
import * as fs from 'fs';
import * as path from 'path';
import { Calculation } from '../calculations/entities/calculation.entity';
import { CalculationsService } from '../calculations/calculations.service';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly orderService: OrderService,
    private readonly calculationService: CalculationsService,
  ) {}

  private static getNotes(order: OrderDocument) {
    return new Paragraph({
      text: order.notes,
      spacing: {
        after: 200,
        before: 200,
      },
    });
  }

  private static getContactInfo(order: OrderDocument) {
    const person = new TextRun({
      break: 1,
      text: 'Контактное лицо: Станчикова Кристина Сергеевна',
    });
    const email = new TextRun({
      break: 1,
      text: 'E-mail: stanchikova_ks@voenmeh.ru',
    });
    const phone = new TextRun({ break: 1, text: 'Тел.: 8-967-593-07-63' });
    return new Paragraph({
      children: [person, email, phone],
    });
  }

  private static getLogo(order: OrderDocument) {
    const imagePath = path.resolve(__dirname, '../../images/title.png');
    console.log(imagePath);

    const imageBuffer = fs.readFileSync(imagePath).toString('base64');
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new ImageRun({
          data: imageBuffer,
          transformation: {
            width: 600,
            height: 100,
          },
        }),
      ],
    });
  }

  private static disableBorderSide() {
    return {
      color: 'none',
      size: 0,
      style: BorderStyle.NONE,
    };
  }

  private static getCostumer(order: OrderDocument) {
    return new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: {
        after: 1000,
        before: 1000,
      },
      children: [
        new TextRun({
          text: `Получатель: ${order.customer.fullName}`,
        }),
      ],
    });
  }

  /**
   * Get document to order by id
   * @param id Order id
   */
  async getByOrder(id: string) {
    try {
      const order = await this.orderService.findOne(id);
      if (!order) return undefined;

      return await Packer.toBase64String(await this.getDocument(order));
    } catch (error: unknown) {
      if (error instanceof Error) console.error('Error -> ', error);
    }
  }

  getDocumentTableHeader() {
    const number = new TableCell({
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: '№ п/п', bold: true })],
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
    });

    const componentName = new TableCell({
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: 'Наименование детали', bold: true })],
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
    });

    const count = new TableCell({
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: 'Кол-во, шт.', bold: true })],
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
    });
    const costOfOneWithOutNDC = new TableCell({
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
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
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: 'Сумма без НДС, руб.', bold: true })],
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
    });
    const costNDC = new TableCell({
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: 'НДС 20%, руб.', bold: true })],
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
    });
    const costWithNDC = new TableCell({
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: 'Сумма с НДС, руб.', bold: true })],
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
    });

    return new TableRow({
      tableHeader: true,
      cantSplit: true,
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
  }

  getComponentRow(calculation: Calculation) {
    const componentName = new TableCell({
      children: [new Paragraph(calculation.name)],
      verticalAlign: VerticalAlign.CENTER,
    });

    const count = new TableCell({
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          text: String(calculation.count),
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
    });
    const oneWithoutNDC = calculation.withoutNDC.one;
    const costOfOneWithOutNDC = new TableCell({
      children: [
        new Paragraph({
          text: String(oneWithoutNDC.toFixed(2)),
          alignment: AlignmentType.RIGHT,
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
    });
    const allWithoutNDC = calculation.withoutNDC.consignment;
    const costWithOutNDC = new TableCell({
      children: [
        new Paragraph({
          text: String(allWithoutNDC.toFixed(2)),
          alignment: AlignmentType.RIGHT,
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
    });

    const costWithNDC = new TableCell({
      children: [
        new Paragraph({
          text: String(calculation.withNDC.consignment.toFixed(2)),
          alignment: AlignmentType.RIGHT,
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
    });

    const costNDC = new TableCell({
      children: [
        new Paragraph({
          text: String(calculation.NDC.consignment.toFixed(2)),
          alignment: AlignmentType.RIGHT,
        }),
      ],
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

  getResultRow(calculations: Calculation[]) {
    const result = new TableCell({
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: 'ИТОГО', bold: true })],
        }),
      ],
      columnSpan: 4,
    });

    let withOutNDC = 0;
    let withNDC = 0;
    let NDC = 0;

    for (const calculation of calculations) {
      withOutNDC += calculation.withoutNDC.consignment;
      withNDC += calculation.withNDC.consignment;
      NDC += calculation.NDC.consignment;
    }

    const costWithOutNDC = new TableCell({
      children: [
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun({
              text: String(withOutNDC.toFixed(2)),
              bold: true,
            }),
          ],
        }),
      ],
    });

    const costWithNDC = new TableCell({
      children: [
        new Paragraph({
          alignment: AlignmentType.RIGHT,

          children: [
            new TextRun({ text: String(withNDC.toFixed(2)), bold: true }),
          ],
        }),
      ],
    });
    const costNDC = new TableCell({
      children: [
        new Paragraph({
          alignment: AlignmentType.RIGHT,

          children: [
            new TextRun({
              text: String(NDC.toFixed(2)),
              bold: true,
            }),
          ],
        }),
      ],
    });
    return [result, costWithOutNDC, costNDC, costWithNDC];
  }

  async getDocument(order: OrderDocument) {
    const logo = DocumentsService.getLogo(order);
    const header = this.getHeader(order);
    const customer = DocumentsService.getCostumer(order);
    const timestamp = this.getTimestamp(order);
    const table = await this.getTable(order);
    const notes = DocumentsService.getNotes(order);
    const confirm = this.getConfirm(order);
    const contactInfo = DocumentsService.getContactInfo(order);
    return new Document({
      title: `${order.name}_${moment().format()}`,
      creator: order.customer.company,
      description: order.notes,
      keywords: order.name,
      styles: {
        default: {
          document: {
            run: {
              font: 'Arial Narrow',
            },
          },
        },
      },
      sections: [
        {
          children: [logo, header, customer, timestamp, table, notes, confirm],
          footers: {
            default: {
              options: { children: [contactInfo] },
            },
          },
        },
      ],
    });
  }

  getTimestamp(order: OrderDocument) {
    const createdAt = order.createdAt;
    const dateString = moment(createdAt)
      .locale('ru')
      .format('Do MMMM YYYY [года]');
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: {
        after: 500,
        before: 500,
      },
      children: [
        new TextRun({
          text: `Коммерческое предложение "${order.name}" от ${dateString}`,
        }),
      ],
    });
  }

  private getConfirm(order: OrderDocument) {
    // const imagePath = path.resolve(__dirname, '../../images/confirm.png');
    // const imageBuffer = fs.readFileSync(imagePath).toString('base64');

    const disableSide = DocumentsService.disableBorderSide();

    return new Table({
      columnWidths: [3000, 4000, 3000],
      borders: {
        bottom: disableSide,
        insideHorizontal: disableSide,
        insideVertical: disableSide,
        left: disableSide,
        right: disableSide,
        top: disableSide,
      },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              verticalAlign: VerticalAlign.CENTER,
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  text: 'Генеральный директор',
                }),
              ],
            }),

            // new TableCell({
            //   verticalAlign: VerticalAlign.CENTER,

            //   children: [
            //     new Paragraph({
            //       alignment: AlignmentType.CENTER,
            //       children: [
            //         new ImageRun({
            //           data: imageBuffer,
            //           transformation: {
            //             width: 200,
            //             height: 150,
            //           },
            //         }),
            //       ],
            //     }),
            //   ],
            // }),

            // new TableCell({
            //   verticalAlign: VerticalAlign.CENTER,
            //   children: [
            //     new Paragraph({
            //       alignment: AlignmentType.CENTER,
            //       text: 'Горбунов А.В.',
            //     }),
            //   ],
            // }),
          ],
        }),
      ],
    });
  }

  private getHeader(order: OrderDocument) {
    const disabledBorder = this.disableBorderTable();
    const getLine = (...args: string[]) => {
      return new TableRow({
        children: args.map(
          (item) =>
            new TableCell({
              borders: disabledBorder,
              children: [
                new Paragraph({
                  children: [new TextRun({ text: item })],
                }),
              ],
            }),
        ),
      });
    };
    return new Table({
      columnWidths: [6000, 3000],
      borders: {
        ...disabledBorder,
        insideHorizontal: DocumentsService.disableBorderSide(),
        insideVertical: DocumentsService.disableBorderSide(),
      },
      rows: [
        getLine(
          '190005, Санкт-Петербург, 1-я Красноармейская, 1/21 / лит А, пом. 10-Н',
          'ИНН 7839110663',
        ),
        getLine('https://icvoenmeh.ru/', 'КПП 783901001'),
        getLine('info_ic@voenmeh.ru', 'ОГРН1187847374329'),
        getLine('8 (812) 495-77-30', ''),
      ],
    });
  }

  private disableBorderTable() {
    const disableBorderSide = DocumentsService.disableBorderSide();

    return {
      bottom: disableBorderSide,
      left: disableBorderSide,
      right: disableBorderSide,
      top: disableBorderSide,
    };
  }

  private async getTable(order: OrderDocument) {
    const calculations = await this.calculationService.getByOrder(order._id);

    const rows = calculations.map(
      (calculation, index) =>
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun(String(index + 1))],
                }),
              ],
            }),
            ...this.getComponentRow(calculation),
          ],
        }),
    );

    const resultRow = new TableRow({
      children: this.getResultRow(calculations),
    });
    const tableHeader = this.getDocumentTableHeader();
    return new Table({
      columnWidths: [500, 3000, 500, 1500, 1500, 1500, 1500],
      rows: [tableHeader, ...rows, resultRow],
    });
  }
}
