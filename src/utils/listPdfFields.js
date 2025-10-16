import { PDFDocument } from "pdf-lib";
import fs from "fs"; // Alleen nodig als je lokaal PDF bestanden leest

async function listPdfFields(pdfPath) {
  const existingPdfBytes = fs.readFileSync(pdfPath); // voor lokale bestanden
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const form = pdfDoc.getForm();
  const fields = form.getFields();
  fields.forEach(f => console.log(f.getName()));
  
}

listPdfFields("./public/templates/helan.pdf"); // pad naar je PDF