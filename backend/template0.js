const fs = require('fs');
module.exports = {
    bill_0: (currentDate, partyData, itemsWithTotal, subtotal, totalTax, totalAmount, totalAmountInWords) => {
        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bill</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
                body {
                    font-family: 'Poppins', sans-serif;
                    background-color: #f4f4f9;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    width: 90%;
                    max-width: 800px;
                    margin: 20px auto;
                    background-color: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    border: 2px solid #007bff;
                    background: linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%);
                    overflow: hidden;
                }
                h1 {
                    text-align: center;
                    color: #007bff;
                    font-size: 1.8rem;
                    letter-spacing: 1px;
                    margin-bottom: 10px;
                    text-transform: uppercase;
                }
                .details, .address {
                    margin-bottom: 15px;
                }
                .details p, .address p {
                    margin: 0;
                    line-height: 1.5;
                    font-size: 0.9rem;
                    color: #333;
                }
                .address h2 {
                    font-size: 1.1rem;
                    margin-bottom: 5px;
                    color: #007bff;
                    border-bottom: 1px solid #007bff;
                    padding-bottom: 3px;
                    display: inline-block;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 10px;
                    overflow-x: auto;
                }
                th, td {
                    padding: 8px;
                    text-align: left;
                    border-bottom: 1px solid #007bff;
                    color: #333;
                    font-size: 0.8rem;
                }
                th {
                    background-color: #007bff;
                    color: white;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.05rem;
                }
                td {
                    color: #555;
                }
                .total {
                    text-align: right;
                    margin-top: 15px;
                    font-size: 1rem;
                }
                .total p {
                    margin: 8px 0;
                    color: #555;
                }
                .total span {
                    font-weight: bold;
                    font-size: 1.2rem;
                    color: #007bff;
                }
                .highlight {
                    background-color: #f8f9fa;
                    padding: 15px;
                    border-radius: 6px;
                    margin-top: 20px;
                }
                .footer {
                    text-align: center;
                    margin-top: 30px;
                    font-size: 0.8rem;
                    color: #888;
                }
                /* Adjust layout for small screens */
                @media screen and (max-width: 800px) {
                    .container {
                        padding: 15px;
                    }
                    h1 {
                        font-size: 1.5rem;
                    }
                    th, td {
                        padding: 5px;
                    }
                }
                @media print {
                    body {
                        padding: 0;
                        margin: 0;
                    }
                    .container {
                        width: 100%;
                        max-width: 100%;
                        border: none;
                        box-shadow: none;
                        padding: 10px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Invoice</h1>

                <div class="details">
                    <p><strong>Date:</strong> ${currentDate}</p>
                    <p><strong>GSTIN:</strong> ${partyData.gstin}</p>
                    <p><strong>Legal Name:</strong> ${partyData.legal_name}</p>
                    <p><strong>Trade Name:</strong> ${partyData.trade_name}</p>
                </div>
                
                <div class="address">
                    <h2>Principal Address</h2>
                    <p>${partyData.principal_address.address1}, ${partyData.principal_address.address2}</p>
                    <p>${partyData.principal_address.city}, ${partyData.principal_address.state}, ${partyData.principal_address.country} - ${partyData.principal_address.pincode}</p>
                </div>
                
                <div class="address">
                    <h2>Shipping Address</h2>
                    <p>${partyData.shipping_address.address1}, ${partyData.shipping_address.address2}</p>
                    <p>${partyData.shipping_address.city}, ${partyData.shipping_address.state}, ${partyData.shipping_address.country} - ${partyData.shipping_address.pincode}</p>
                </div>
        
                <table>
                    <thead>
                        <tr>
                            <th>HSN Code</th>
                            <th>Product Info</th>
                            <th>Qty</th>
                            <th>Unit Price</th>
                            <th>CGST</th>
                            <th>SGST</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsWithTotal.map(item => `
                            <tr>
                                <td>${item.hsn_code}</td>
                                <td>${item.product_info}</td>
                                <td>${item.qty}</td>
                                <td>₹${item.unitPrice}</td>
                                <td>₹${item.cgstAmount.toFixed(2)}</td>
                                <td>₹${item.sgstAmount.toFixed(2)}</td>
                                <td>₹${item.total.toFixed(2)}</td>
                            </tr>`).join('')}
                    </tbody>
                </table>
        
                <div class="total highlight">
                    <p>Subtotal: ₹${subtotal.toFixed(2)}</p>
                    <p>Total Tax (CGST + SGST): ₹${totalTax.toFixed(2)}</p>
                    <p><span>Total Amount: ₹${totalAmount.toFixed(2)}</span></p>
                    <p><span>Total Amount in Words: ${totalAmountInWords}</span></p>
                </div>

                <div class="footer">
                    <p>Thank you for your business!</p>
                </div>
            </div>
        </body>
        </html>
        `;
        return html;
    }
};
