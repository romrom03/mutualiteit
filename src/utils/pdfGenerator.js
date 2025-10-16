import { PDFDocument } from "pdf-lib";

export async function generateMutualityPDF(mutuality) {
  const templateUrl = `/templates/${mutuality.toLowerCase()}.pdf`;
  const existingPdfBytes = await fetch(templateUrl).then(r => r.arrayBuffer());

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const form = pdfDoc.getForm();

  // --- Persoonlijke info ---
  form.getTextField("Naam")?.setText("TestNaam");
  form.getTextField("Voornaam")?.setText("TestVoornaam");
  form.getTextField("Straat")?.setText("TestStraat");
  form.getTextField("Nummer")?.setText("1");
  form.getTextField("Bus")?.setText("A");
  form.getTextField("Postcode")?.setText("1000");
  form.getTextField("Gemeente")?.setText("TestGemeente");
  form.getTextField("Land")?.setText("België");

  // --- Rijksregisternummer ---
  const rr = "12345678901"; // 11 cijfers
  rr.split("").forEach((c, i) => {
    form.getTextField(`RR.${i}`)?.setText(c);
  });

  /*
  // --- Datum betaling (hardcoded) ---
  const paymentDate = "01092024"; // ddmmyyyy
  paymentDate.split("").forEach((c, i) => {
    form.getTextField(`Datum.8.${i}`)?.setText(c);
  });
  */

  // --- Organisatie ---
  form.getTextField("Naam organisatie")?.setText("Scouts Hellegat Don Bosco");
  form.getTextField("Adres organisatie")?.setText("Hellegat 10, 2845 Niel");
  form.getTextField("Tel of email")?.setText("groepsleiding@scoutshellegat.be");
  form.getTextField("Betaald bedrag")?.setText("€160");
  //form.getTextField("Periode kamp van - tot")?.setText("01/09/2024 - 31/08/2025");
  form.getTextField("Datum betaling").setText("01/09/2024");
  // --- Overige info ---
  form.getTextField("Beoefende sport")?.setText("Voetbal");
  form.getTextField("Sportfederatie")?.setText("KBVB");
  form.getTextField("Jeugdvereniging")?.setText("Scouts Hellegat");
  form.getTextField("Datum.8.0")?.setText("1");
  form.getTextField("Datum.9.0")?.setText("4");
  form.getTextField("Datum.10.0")?.setText("1");
  form.getTextField("Datum.11.0")?.setText("0");
  form.getTextField("Datum.12.0")?.setText("2");
  form.getTextField("Datum.13.0")?.setText("0");
  form.getTextField("Datum.14.0")?.setText("2");
  form.getTextField("Datum.15.0")?.setText("5");
  

  form.flatten();

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `mutualiteit-${mutuality}.pdf`;
  link.click();
}
