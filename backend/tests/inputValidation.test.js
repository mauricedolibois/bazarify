import { createRequire } from "module"
const require = createRequire(import.meta.url)
const Joi = require('joi');
const InputValidation = require('../src/services/InputValidation.cjs')

describe('Validation Functions', () => {
  // Test for validateProduct
  test('validateProduct should return validProduct for valid inputs', async () => {
    const id = 1;
    const name = 'Product Name';
    const price = 100;
    const category = 'Electronics';

    const result = await InputValidation.validateProduct(id, name, price, category);

    expect(result).toEqual({
        product_id: id,
        product_name: name,
        product_price: price,
        product_category: category,
      },
    );
  });

  test('validateProduct should return error message for invalid inputs', async () => {
    const id = 1;
    const name = 'Product Name';
    const price = 'Invalid Price'; // Price should be a number, this is an invalid input.
    const category = 'Electronics';

    const result = await InputValidation.validateProduct(id, name, price, category);

    expect(result).toContain("Überprüfe deinen Input bei Preis (nur Zahlen)");
  });

});