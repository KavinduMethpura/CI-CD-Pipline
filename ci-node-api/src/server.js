/**
 * Server entry point for the CI-CD Node API application.
 *
 * This module initializes and starts the Express server on the specified port.
 * It imports the configured Express application from the app module and listens
 * for incoming HTTP requests on port 3000.
 *
 * @module server
 * @requires ./app - The configured Express application instance
 * @constant {number} PORT - The port number on which the server will listen (3000)
 * @example
 * // Start the server
 * node src/server.js
 */

const app = require("./app");

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
