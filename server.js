const express = require('express');
const cors = require('cors');
const { PDFDocument } = require('pdf-lib');
const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Allow requests from this origin
}));

app.use(express.json());

// POST route to generate certificate and send as download
app.post('/generate-certificate', async (req, res) => {
    const { name, event, date } = req.body;

    if (!name || !event || !date) {
        return res.status(400).send('Name, event, and date are required.');
    }

    try {
        // Create the certificate PDF
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 400]);
        page.drawText(`Certificate of Participation`, { x: 150, y: 300, size: 20 });
        page.drawText(`Awarded to: ${name}`, { x: 150, y: 260, size: 15 });
        page.drawText(`For participating in: ${event}`, { x: 150, y: 230, size: 15 });
        page.drawText(`Date: ${date}`, { x: 150, y: 200, size: 15 });

        const pdfBytes = await pdfDoc.save();

        // Send the generated PDF as a response for download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${name}-certificate.pdf"`);
        res.send(Buffer.from(pdfBytes));
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while generating the certificate.');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
