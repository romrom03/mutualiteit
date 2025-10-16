import { PDFDocument } from "pdf-lib";

export async function listFields(mutuality) {
  const templateUrl = `/templates/${mutuality.toLowerCase()}.pdf`;
  const existingPdfBytes = await fetch(templateUrl).then(r => r.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const form = pdfDoc.getForm();

  const fieldNames = form.getFields().map(f => f.getName());
  console.table(fieldNames);
}
