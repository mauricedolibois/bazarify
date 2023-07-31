import { createRequire } from "module"
const require = createRequire(import.meta.url)
const request = require('supertest');
const PrintingService = require('../src/services/PrintingService.cjs')
const fs = require('fs').promises;
const path = require('path');

describe('Printing Functions', () => {
    test('Test if printing service successfully creates pdf and saves it in frontend public folder', async () => {
        const testProducts = [
            {product_id:12345, product_name: "Nordica Dobermann GSR 180cm", product_price: 600,  product_category: "Ski"},
            {product_id:54321, product_name: "Atomic Redster G9 175cm", product_price: 450,  product_category: "Ski"},
            {product_id:23415, product_name: "Head Rebels E-Speed", product_price: 500,  product_category: "Ski"},
          ];
        const testSeller = {seller_id: 123, seller_name: "Max Mustermann", seller_address: "Musterstraße 1", seller_email: "max.mustermann@example.de", seller_phone: "1233423423"};
        const testOffers = [
            {off:{offer_id: 1234567890, offer_product_id: 12345, offer_seller_id: 123, offer_price: 500, offer_quantity: 1}},
            {off:{offer_id: 9876543219, offer_product_id: 54321, offer_seller_id: 123, offer_price: 400, offer_quantity: 1}},
            {off:{offer_id: 3452352322, offer_product_id: 23415, offer_seller_id: 123, offer_price: 450, offer_quantity: 1}},
        ];
        await PrintingService.createPDF(testOffers, testProducts);

        // Check if the file exists
        const fileExists = await fs.access("../frontend/public/barcode.pdf").then(() => true).catch(() => false);

        expect(fileExists).toBe(true);

        // Check if the file is less than a minute old
        const fileStat = await fs.stat("../frontend/public/barcode.pdf");
        const currentTime = new Date();
        const fileCreationTime = fileStat.ctime;
        const timeDifferenceInSeconds = Math.abs((currentTime - fileCreationTime) / 1000);
        expect(timeDifferenceInSeconds).toBeLessThan(60);
    });
});