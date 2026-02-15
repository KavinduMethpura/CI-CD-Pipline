/**
 * Test suite for API endpoints
 * 
 * This file contains unit tests for the main API application using Jest and Supertest.
 * It verifies the health check endpoint and user retrieval functionality.
 * 
 * @file Tests for the Express API application
 * @requires supertest - HTTP assertion library for testing Node.js HTTP servers
 * @requires ../src/app - The Express application instance to be tested
 */

const request = require('supertest');
const app = require('../src/app');

describe('API Tests', () => {

    test('GET /health should return status ok', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('ok');
    });

    test('GET /users should return a list of users', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(2);
    });
});
