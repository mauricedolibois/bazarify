
import { createRequire } from "module"
const require = createRequire(import.meta.url)
const PrintingService = require('./PrintingService.cjs')
import {dbConnection} from '../database/DbConnection.js'

export const printing = {
    async printOffers(offers) {
      var products = []
        try {
            for (const offer of offers) {
                const product = await dbConnection.findProduct('product_id', offer.off.product_id);
                products.push(product);
            }
            await PrintingService.createPDF(offers, products);
            products = [];
          } catch (error) {
            res.status(500).json({ error: 'Failed to generate offers' });
          }
    },
}