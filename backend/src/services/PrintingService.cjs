const { exec } = require('child_process');
const bwipjs = require('bwip-js');
const tmp = require('tmp');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const os = require('os');
const path = require('path');



module.exports = {
createPDF: async function (offers, products) {
  const doc = new PDFDocument({ margin: -20 });
  const labelWidth = 70;
  const labelHeight = 36;
  const pageMarginX = 30;
  const pageMarginY = 0;
  const labelSpacingX = 150;
  const labelSpacingY = 72;
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

    // Generate barcode as base64-encoded image
    const barcodeOptions = {
      bcid: 'code128',
      text: offer.off.offer_id.toString(),
      includetext: true,
      scale: 2,
      height: 15,
      resolution: 1000,
    };

    doc.image(await this.generateBarcode(barcodeOptions), posX, posY, { width: labelWidth, align: 'center' });
    console.log("Barcode erstellt.")
    // Add pricing information below barcode
    const pricePosX = posX + labelWidth / 7 -10;
    const pricePosY = posY + labelHeight + 10;
    doc.font('Helvetica').fontSize(8).text("Preis: " + product.product_price.toString() + "€", pricePosX, pricePosY, {
      align: 'center',
      width: labelWidth,
      lineBreak: false,
      ellipsis: true,
      underline: false,
      characterSpacing: 0,
      wordSpacing: 0,
      indent: 0,
      underlineThickness: 0.5,
      link: null,
      continued: false,
    });
    labelsOnPage++;
  }
  console.log("PDF created successfully.");
  await this.saveAndOpenPDF(doc, "./sample.pdf").catch((err) => {
    console.log(err);
  });
},
  
  generateBarcode: async function(barcodeOptions) {
    // Use your preferred method or library to generate the barcode image
    // and return the file path or buffer of the barcode image
    // For example, you can use 'bwip-js' library as shown below:
    const bwipjs = require('bwip-js');

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

  printPDF: async function (doc) {

      
      return new Promise(async (resolve, reject) => {

        const printerName = await this.getDefaultPrinterName();
      const printCommand = `lp -d "${printerName}" "${"./barcode.pdf"}"`;
      exec(printCommand, (error, stdout, stderr) => {
        if (error) {
          console.error('Error printing PDF:', error);
          reject(error);
        } else if (stderr) {
          console.error('Error printing PDF:', stderr);
          reject(stderr);
        } else {
          console.log('PDF printed successfully.');
          resolve();
        }
      });
  });
  },

  openPDF: function (pdfPath) {
    return new Promise((resolve, reject) => {
      const command = `open "${pdfPath}"`;
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error('Error opening PDF:', error);
          reject(error);
        } else {
          resolve();
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
  
        // If you're running the server on Windows, you might use `start` instead of `open`
        exec(`open "${filePath}"`, (error) => {
          if (error) {
            console.error('Error opening PDF:', error);
            reject(error);
          } else {
            resolve();
          }
        });
      });
  
      stream.on('error', (error) => {
        console.error('Error saving PDF:', error);
        reject(error);
      });
    });
  },

  getDefaultPrinterName: function () {
    return new Promise((resolve, reject) => {
      const { exec } = require('child_process');
      if (process.platform === 'win32') {
        exec('wmic printer get name,default', (error, stdout, stderr) => {
          if (error) {
            console.error('Error retrieving default printer:', error);
            reject(error);
          } else if (stderr) {
            console.error('Error retrieving default printer:', stderr);
            reject(stderr);
          } else {
            const printerNames = stdout.split('\r\r\n').map((line) => line.trim()).filter(Boolean);
            if (printerNames.length > 0) {
              const defaultPrinter = printerNames[0];
              resolve(defaultPrinter);
            } else {
              resolve('No printers found');
            }
          }
        });
      } else if (process.platform === 'darwin' || process.platform === 'linux') {
        exec('lpstat -d', (error, stdout, stderr) => {
          if (error) {
            console.error('Error retrieving default printer:', error);
            reject(error);
          } else if (stderr) {
            console.error('Error retrieving default printer:', stderr);
            reject(stderr);
          } else {
            const match = stdout.match(/^System-Standardzielort:\s(.+)$/m);
            if (match && match[1]) {
              const defaultPrinter = match[1];
              resolve(defaultPrinter);
            } else {
              resolve('No default printer found');
            }
          }
        });
      } else {
        resolve('Unsupported platform');
      }
    });
  }
};
