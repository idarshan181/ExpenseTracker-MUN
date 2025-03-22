/* eslint-disable new-cap */

'use client';

import { format } from 'date-fns';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';

type Transaction = {
  description: string;
  amount: number;
  source: string;
  transactionType: 'income' | 'expense';
  transactionDate: string;
  category: {
    name: string;
  };
};

type ExportPDFProps = {
  data: Transaction[];
  customerName: string;
};

declare module 'jspdf' {
  interface jsPDF {
    lastAutoTable: {
      finalY: number;
    };
  }
}

const loadImage = (src: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext('2d')?.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = reject;
  });
};

export const exportPDF = async ({ data, customerName }: ExportPDFProps) => {
  const doc = new jsPDF();
  const logo = await loadImage('/logos/logo.png');

  const currentDateTime = format(new Date(), 'dd MMMM yyyy, hh:mm a');
  const firstName = customerName.split(' ')[0] || 'user';
  const fileName = `${firstName}-transactions-${format(new Date(), 'yyyy-MM-dd-HHmm')}.pdf`;

  const centerX = doc.internal.pageSize.getWidth() / 2;
  doc.addImage(logo, 'PNG', centerX - 30, 10, 12, 12);
  doc.setFontSize(16);
  doc.text('ExpenseVision', centerX - 12, 18);

  doc.setFontSize(10);
  doc.text(`Customer: ${customerName}`, doc.internal.pageSize.getWidth() - 14, 12, { align: 'right' });
  doc.text(`Generated: ${currentDateTime}`, doc.internal.pageSize.getWidth() - 14, 18, { align: 'right' });

  const rows: RowInput[] = data.map(txn => [
    format(new Date(txn.transactionDate), 'dd MMM yyyy'),
    txn.description,
    txn.category?.name || '-',
    `CA$${txn.amount.toLocaleString()}`,
    txn.source,
    txn.transactionType,
  ]);

  const totalIncome = data
    .filter(d => d.transactionType === 'income')
    .reduce((sum, d) => sum + d.amount, 0);

  const totalExpense = data
    .filter(d => d.transactionType === 'expense')
    .reduce((sum, d) => sum + d.amount, 0);

  autoTable(doc, {
    startY: 30,
    head: [['transactionDate', 'Description', 'Category', 'Amount', 'Source', 'Type']],
    body: rows,
    theme: 'grid',
    alternateRowStyles: { fillColor: [245, 245, 245] },
    headStyles: { fillColor: [22, 160, 133], textColor: 255 },
    styles: { fontSize: 9 },
    margin: { top: 30 },

    didParseCell: (data) => {
      if (data.section === 'body') {
        const row = data.row.raw as string[];
        const txnType = row?.[5];

        if (data.column.index === 5) {
          data.cell.styles.textColor
            = txnType === 'income'
              ? [0, 128, 0]
              : txnType === 'expense'
                ? [200, 0, 0]
                : [0, 0, 0];

          data.cell.text = [
            typeof txnType === 'string'
              ? txnType.charAt(0).toUpperCase() + txnType.slice(1)
              : '-',
          ];
        }

        if (data.column.index === 3) {
          data.cell.styles.textColor
            = txnType === 'income'
              ? [0, 128, 0]
              : txnType === 'expense'
                ? [200, 0, 0]
                : [0, 0, 0];
        }
      }
    },

    didDrawPage: (data) => {
      const pageSize = doc.internal.pageSize;
      const pageHeight = pageSize.height || pageSize.getHeight();
      const pageCount = doc.internal.pages;

      doc.setFontSize(10);
      doc.text(
        `Page ${data.pageNumber} of ${pageCount}`,
        pageSize.width - 14,
        pageHeight - 10,
        { align: 'right' },
      );
    },
  });

  const finalY = doc.lastAutoTable?.finalY || 40;
  const pageHeight = doc.internal.pageSize.getHeight();

  if (finalY + 30 > pageHeight) {
    doc.addPage();
  }

  doc.setFontSize(11);
  doc.text(`Total Income: CA$${totalIncome.toLocaleString()}`, 14, finalY + 10);
  doc.text(`Total Expenses: CA$${totalExpense.toLocaleString()}`, 14, finalY + 18);

  doc.save(fileName);
};
