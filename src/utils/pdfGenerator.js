import { PDFDocument } from "pdf-lib";

export async function generateMutualityPDF(mutuality, formData, fields) {
  const templateUrl = `/templates/${mutuality}.pdf`;
  const existingPdfBytes = await fetch(templateUrl).then((r) => r.arrayBuffer());

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const form = pdfDoc.getForm();

  Object.entries(formData).forEach(([key, value]) => {
    const fieldConfig = fields[key];
    if (fieldConfig.type === "split") {
      const chars = value.split("").filter(c => c !== "/"); // slashes eruit
      const startIndex = fieldConfig.startIndex || 0;
    
      if (fieldConfig.prefix === "RR.") {
        // Rijksregisternummer (RR.0 t/m RR.10)
        chars.forEach((c, i) => {
          const fieldName = `${fieldConfig.prefix}${i}`;
          const pdfField = form.getTextField(fieldName);
          if (pdfField) pdfField.setText(c);
          else console.warn(`Split veld "${fieldName}" niet gevonden in PDF`);
        });
      } else {
        // Datumvelden (gebruik de opgegeven kolom)
        const columns = fieldConfig.columns || [0];
        columns.forEach(col => {
          chars.forEach((c, i) => {
            const fieldName = `${fieldConfig.prefix}${i + startIndex}.${col}`;
            const pdfField = form.getTextField(fieldName);
            if (pdfField) pdfField.setText(c);
            else console.warn(`Split veld "${fieldName}" niet gevonden in PDF`);
          });
        });
      }
    }
    
       
     else {
      const pdfFieldName = fieldConfig.pdfField || key;
      const field = form.getTextField(pdfFieldName);
      if (field) field.setText(value);
      else console.error(`Form field "${pdfFieldName}" niet gevonden in PDF.`);
    }
  });

  return await pdfDoc.save();
}
