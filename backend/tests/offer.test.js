import { createRequire } from "module"
const require = createRequire(import.meta.url)
const request = require('supertest');
import {app} from '../src/main.js';
import {dbConnection} from '../src/database/DbConnection.js';

beforeAll(async () => {
  await dbConnection.newDB("Test", 2023, 5, "This is a test Bazar");
});

afterAll( async() => {
  await dbConnection.changeDB("Bazarify")
  await dbConnection.dropBazar("Test");
}, 10000);

describe('/api/offer', () => {
  it('should create a new offer', async () => {
    const testSeller = { seller_name: 'John',seller_firstname:'Doe', seller_email: 'john@example.com', seller_phone: '123456789'};
    const testProduct =[{ product_name: 'Test', product_price: 10, product_category: 'Test'}];
    const testOffer = { product: testProduct, seller: testSeller};
    const response = await request(app).post('/api/offer').send(testOffer);
    expect(response.status).toBe(200);
    expect(response.text).toContain("http://localhost:3000/barcode.pdf");
  }, 10000);

  it('should not create a new offer with missing seller', async () => {
    const testProduct =[{ product_name: 'Test', product_price: 10, product_category: 'Test'}];
    const testOffer = { product: testProduct};
    const response = await request(app).post('/api/offer').send(testOffer);
    expect(response.text).toContain("ERROR:");
  }, 10000);

  it('should return all offers', async () => {
    const response = await request(app).get('/api/allOffers');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          offer_id: expect.any(Number),
          product_id: expect.any(Number),
          seller_id: expect.any(Number),
        }),
      ])
    );
  }, 10000);

});
