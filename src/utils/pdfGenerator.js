import { PDFDocument } from "pdf-lib";

export async function generateMutualityPDF(mutuality, formData, fields) {
  // Dynamische URL op basis van de mutualiteit
  const templateUrl = `/templates/${mutuality}.pdf`;
  const existingPdfBytes = await fetch(templateUrl).then((r) => r.arrayBuffer());

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const form = pdfDoc.getForm();

  // Vul de velden in op basis van de configuratie
  Object.entries(formData).forEach(([key, value]) => {
    const fieldConfig = fields[key];

    if (typeof fieldConfig === "object" && fieldConfig.type === "split") {
      // Speciale logica voor gesplitste velden (zoals rijksregisternummer of datum)
      value.split("").forEach((c, i) => {
        form.getTextField(`${fieldConfig.prefix}${i}`)?.setText(c);
      });
    } else {
      // Gebruik de veldnaam uit de configuratie om het veld in te vullen
      const pdfFieldName =
        typeof fieldConfig === "string" ? fieldConfig : fieldConfig.pdfField;
      const field = form.getTextField(pdfFieldName);
      if (field) {
        field.setText(value);
      } else {
        console.error(`Form field "${pdfFieldName}" niet gevonden in de PDF.`);
      }
    }
  });

  // Sla de ingevulde PDF op in een ArrayBuffer
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}