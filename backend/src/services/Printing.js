
import { createRequire } from "module"
const require = createRequire(import.meta.url)
const PrintingService = require('./PrintingService.cjs')
import {dbConnection} from '../database/DbConnection.js'

export const printing = {
    async printOffers(offers) {
      var products = []
        try {
            const pendingOffers = offers;
            for (const offer of pendingOffers) {
              const product = await dbConnection.findProduct('product_id', offer.product_id);
              products.push(product);
            }
            PrintingService.createPDF(pendingOffers, products);
            products = [];
          } catch (error) {
            res.status(500).json({ error: 'Failed to generate offers' });
          }
    },

    async generatePDF(offers) {
      var products = []
      try {
          const pendingOffers = offers;
          for (const offer of pendingOffers) {
            const product = await dbConnection.findProduct('product_id', offer.product_id);
            products.push(product);
          }
          var doc = PrintingService.createPDF(pendingOffers, products);
          products = [];
          return doc;
        } catch (error) {
          res.status(500).json({ error: 'Failed to generate offers' });
        }
    },

    async getPrinterName(){
      return PrintingService.getDefaultPrinterName();
    }
}