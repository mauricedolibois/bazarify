import { createRequire } from "module"
const require = createRequire(import.meta.url)
const request = require('supertest');
const UniqueIDs = require('../src/services/UniqueIDs.cjs')
const fs = require('fs').promises;
const path = require('path');

describe('Unique ID Functions', () => {
    test('Test if unique ID is generated', async () => {
        const testIDLong = await UniqueIDs.generateOfferId();
        const testIDShort = await UniqueIDs.generateProductId();
        expect(testIDLong.length).toBe(10);
        expect(testIDShort.length).toBe(5);
    });
});