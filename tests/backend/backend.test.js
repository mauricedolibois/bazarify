//jest imports
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { app } = require('../../backend/src/main.js');
const { productDAO } = require('../../backend/src/database/operations/ProductDAO.js');
//jest globals
let mongoServer;
//jest hooks
beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
}
);
afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
}
);
beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
}
);
//jest tests
describe('GET /api/allProducts', () => {
    it('should return all products', async () => {
        const product1 = await productDAO.insertProduct("product1", 1, "category1");
        const product2 = await productDAO.insertProduct("product2", 2, "category2");
        const response = await request(app).get('/api');
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(3);
        expect(response.body[0].seller_id).toBe(seller1.seller_id);
        expect(response.body[1].seller_id).toBe(seller2.seller_id);
    });
}
);