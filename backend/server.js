const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { toWords } = require('number-to-words');
const { bill_0 } = require('./template0');  
const pdf = require('html-pdf');
const app = express();
const port = 5000;
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use('/bills', express.static(path.join(__dirname, 'bills')));
app.post('/generate-bill', (req, res) => {
    const partyData = req.body.party;
    const currentDate = new Date().toLocaleDateString('en-GB');
    console.log('Received data:', partyData);
    if (!partyData.gstin || !partyData.legal_name || !partyData.trade_name || 
        !partyData.principal_address || !partyData.shipping_address || 
        !req.body.quantities || !req.body.hsn_details || !req.body.rates) {
        return res.status(400).json({ error: 'Missing required fields in the request body.' });
    }
    const quantities = req.body.quantities;
    const hsnDetails = req.body.hsn_details;
    const rates = req.body.rates;
    if (hsnDetails.length !== quantities.length || hsnDetails.length !== rates.length) {
        return res.status(400).json({ error: 'Mismatch between the number of HSN details, quantities, and rates.' });
    }
    let totalQuantity = 0;
    const itemsWithTotal = hsnDetails.map((item, index) => {
        const qty = Number(quantities[index]) || 0;
        const unitPrice = Number(rates[index]) || 0;
        const totalItemPrice = qty * unitPrice;
        const cgstAmount = (totalItemPrice * item.cgst) / 100;
        const sgstAmount = (totalItemPrice * item.sgst) / 100;
        const totalTax = cgstAmount + sgstAmount;
        const total = totalItemPrice + totalTax;
        totalQuantity += qty;
        return {
            hsn_code: item.hsn, 
            product_info: item.product_info, 
            qty,
            unitPrice,
            totalItemPrice,
            cgstAmount,
            sgstAmount,
            totalTax,
            total,
        };
    });
    const subtotal = itemsWithTotal.reduce((acc, item) => acc + item.totalItemPrice, 0);
    const totalTax = itemsWithTotal.reduce((acc, item) => acc + item.totalTax, 0);
    const totalAmount = subtotal + totalTax;
    const convertAmountToWords = (amount) => {
        const [integerPart, decimalPart] = amount.toFixed(2).split('.');
        let words = toWords(integerPart);
        if (parseInt(decimalPart) > 0) {
            words += ` And ${toWords(decimalPart)} Paise`;
        }
        return words.charAt(0).toUpperCase() + words.slice(1);
    };
    const totalAmountInWords = convertAmountToWords(totalAmount);
    const html = bill_0(currentDate, partyData, itemsWithTotal, subtotal, totalTax, totalAmount, totalAmountInWords);
    const htmlFilePath = path.join(__dirname, 'bills', `invoice_${partyData.gstin}.html`);
    const pdfFilePath = path.join(__dirname, 'bills', `invoice_${partyData.gstin}.pdf`);
    fs.writeFile(htmlFilePath, html, (err) => {
        if (err) {
            console.error('Error writing HTML file:', err);
            return res.status(500).json({ error: 'Error generating the HTML bill.' });
        }
        pdf.create(html).toFile(pdfFilePath, (err) => {
            if (err) {
                console.error('Error generating PDF:', err);
                return res.status(500).json({ error: 'Error generating the PDF bill.' });
            }

            res.json({
                message: 'Bill generated successfully.',
                filePath: `bills/invoice_${partyData.gstin}.pdf`
            });
        });
    });
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
