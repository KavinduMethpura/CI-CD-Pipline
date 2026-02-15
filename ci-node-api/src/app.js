/**
 * Express application configuration and route definitions
 * 
 * This module sets up the Express server with middleware and API routes.
 * It provides health check and user data endpoints.
 * 
 * @module app
 * @requires express
 * 
 * @example
 * const app = require('./app');
 * const server = app.listen(3000);
 * 
 * Routes:
 * - GET /health - Returns server health status
 * - GET /users - Returns a list of users
 */

const express = require('express');
const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.get('/users', (req, res) => {
    res.status(200).json([
        { id: 1, name: "John" },
        { id: 2, name: "jane" }
    ]);
});

module.exports = app;