// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const { log } = require('console');
const routes = require('./routes');
const loggerMiddleware = require('./middleware/logger');
const apiKeyAuth = require('./middleware/apiKeyAuth');


// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;


// ------------ MIDDLEWARE --------------

// Body parser & middleware use
app.use(loggerMiddleware);
app.use(bodyParser.json());
app.use('/secure', apiKeyAuth);


// --------------- ROUTES ----------------
app.use('/', routes);



// ----------- Error handling -------------
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({error: 'Something went wrong'});
})



// ---------- Start the server ------------
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// Export the app for testing purposes
module.exports = app; 