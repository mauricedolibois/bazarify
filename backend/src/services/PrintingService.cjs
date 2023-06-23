import e from 'express';
import { off } from 'process';

const { PDFDocument, rgb } = require('pdf-lib');
const JsBarcode = require('jsbarcode');
const { createCanvas } = require('canvas');
const { print } = require('pdf-to-printer');
const fs = require('fs');

module.exports = {
    createPDF: async function(offers){
        var offersOnPage = 0;
        var X_Coord = 50;
        var Y_Coord = 50;

        for(let i = 0; i < offers.length; i++){
            if(offersOnPage == 28){

                try{
                    await printPDF();
                }
                catch{
                    console.log("could not print products")
                }
                finally{
                    offersOnPage = 0;
                    X_Coord = 50;
                    Y_Coord = 50;
                }
            }

            var offer = offers[i];
            console.log(offer);
            // Add barcode image to the PDF
            const canvas = createCanvas();

            JsBarcode(canvas, offer.offer_id, {
                format: 'CODE128', // Specify the barcode format you want to generate
                displayValue: false, // Set to true if you want to display the barcode value below the barcode
                width: 200, // Set the width of the barcode
                height: 80 // Set the height of the barcode
            });
            
            
            const barcodeImage = canvas.toBuffer('image/png'); // Implement this function to generate the barcode image
            const barcodeImageEmbed = await pdfDoc.embedPng(barcodeImage);
            const barcodeImageDims = barcodeImageEmbed.scale(0.5); // Adjust the scaling as per your requirements
            page.drawImage(barcodeImageEmbed, {
                x: 50,
                y: height - barcodeImageDims.height - 50,
                width: barcodeImageDims.width,
                height: barcodeImageDims.height,
            });

            // Add pricing information to the PDF
            const textWidth = pdfLib.PDFText.widthOfTextAtSize(product.product_price, 12); // Adjust the font size as per your requirements
            page.drawText(product.product_price, {
                x: 100-textWidth,
                y: height - barcodeImageDims.height - 80, // Adjust the positioning as per your requirements
                size: 12, // Adjust the font size as per your requirements
                font: await pdfDoc.embedFont(pdfLib.StandardFonts.Arial), // Use a suitable font for the pricing information
                color: rgb(0, 0, 0), // Adjust the color as per your requirements
            });

            offersOnPage++;
            if(offersOnPage == 4){
                X_Coord = 50;
                Y_Coord += 150;
            }
            else{
                X_Coord += 150;
            }
            
        }
        try{
            await printPDF();
        }
        catch{
            console.log("could not print products")
        }
    },

    printPDF: async function(){

        const pdfBuffer = await pdfDoc.save();
        const pdfPath = './barcode.pdf';
        fs.writeFileSync(pdfPath, pdfBuffer);

        try {
            console.log('Printing PDF...');
            await print(pdfPath);
            console.log('PDF printed successfully.');
        } catch (error) {
            console.error('Error printing PDF:', error);
        }
    }
}
