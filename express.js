const express = require('express');
const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');
const Certificate = require('./models/certificate'); 

const app = express();
app.use(express.json());

app.post('/generate-certificate', async (req, res) => {
  const { name, event, date } = req.body;

  const newCertificate = new Certificate({ name, event, date });
  await newCertificate.save();

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);

  page.drawText(`Certificate of Participation`, {
    x: 200,
    y: 300,
    size: 25,
    color: rgb(0, 0, 0),
  });
  page.drawText(`Awarded to: ${name}`, {
    x: 200,
    y: 250,
    size: 20,
    color: rgb(0, 0, 0),
  });
  page.drawText(`For: ${event}`, {
    x: 200,
    y: 200,
    size: 20,
    color: rgb(0, 0, 0),
  });
  page.drawText(`Date: ${date}`, {
    x: 200,
    y: 150,
    size: 20,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(`./certificates/${name}-certificate.pdf`, pdfBytes);
  res.setHeader('Content-Type', 'application/pdf');
  res.send(pdfBytes);
});

app.listen(3000, () => console.log('Server running on port 3000'));
