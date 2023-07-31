const { exec } = require('child_process');
const bwipjs = require('bwip-js');
const tmp = require('tmp');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const os = require('os');
const path = require('path');


// This module exports a function that creates a PDF document with labels with barcodes and pricing information and saves it to a file.
module.exports = {
createPDF: async function (offers, products) {
  const doc = new PDFDocument({ margin: 0 });
  const labelWidth = 70;
  const labelHeight = 36;
  const pageMarginX = 30;
  const pageMarginY = 0;
  const labelSpacingX = 150;
  const labelSpacingY = 64;
  const labelsPerRow = 3;
  const rowsPerPage = 8;
  var labelsOnPage = 0;
  const labelsPerPage = 24;

  for (let i = 0; i < offers.length; i++) {
    
    if (labelsOnPage == 24) {
      doc.addPage();
      labelsOnPage = 0;
    }

    const pageIndex = Math.floor(labelsOnPage / labelsPerPage);
    const labelIndex = labelsOnPage % labelsPerPage;
    const row = Math.floor(labelIndex / labelsPerRow);
    const col = labelIndex % labelsPerRow;

    const posX = pageMarginX + col * (labelWidth + labelSpacingX) + pageIndex * doc.page.width;
    const posY = pageMarginY + row * (labelHeight + labelSpacingY);

    const offer = offers[i];
    const product = products[i];

    // Sets the barcode settings for generating the barcode as an image
    const barcodeOptions = {
      bcid: 'code128',
      text: offer.off.offer_id.toString(),
      includetext: true,
      scale: 2,
      height: 15,
      resolution: 1000,
    };

    doc.image(await this.generateBarcode(barcodeOptions), posX, posY, { width: labelWidth, align: 'center' });
    // Add pricing information below barcode
    const pricePosX = posX + labelWidth / 7 -10;
    const pricePosY = posY + labelHeight + 10;
    doc.font('Helvetica').fontSize(8).text("Preis: " + product.product_price.toString() + "€", pricePosX, pricePosY, {
      align: 'center',
      width: labelWidth,
      characterSpacing: 0,
      wordSpacing: 0,
      indent: 0,
      underlineThickness: 0.5,
    });
    labelsOnPage++;
  }
  await this.saveAndOpenPDF(doc, "./barcode.pdf").catch((err) => {
    console.log(err);
  });
},

  // This function generates a barcode as a PNG image and returns it as a Buffer
  generateBarcode: async function(barcodeOptions) {
    return new Promise((resolve, reject) => {
      bwipjs.toBuffer(barcodeOptions, (err, pngBuffer) => {
        if (err) {
          reject(err);
        } else {
          resolve(pngBuffer);
        }
      });
    });
  },

  saveAndOpenPDF: function (doc, fileName) {
    return new Promise((resolve, reject) => {
      // Assuming you are using ExpressJS to serve the frontend
      const frontendPublicDir = path.join('../frontend/public'); // Path to frontend/public directory
      const filePath = path.join(frontendPublicDir, fileName); // File path inside frontend/public folder
  
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);
      doc.end();
  
      stream.on('finish', () => {
        console.log('PDF saved successfully.');
        resolve(filePath); // Resolve the path to the saved PDF
      });
  
      stream.on('error', (error) => {
        console.error('Error saving PDF:', error);
        reject(error);
      });
    });
  },
};
