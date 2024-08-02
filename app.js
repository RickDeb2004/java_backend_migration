const express = require('express');
const bodyParser = require('body-parser');
const s3Config = require('./config/s3Config');
const securityConfig = require('./config/securityConfig');
const codeController = require('./controllers/codeController');
const commonController = require('./controllers/commonController');
const userController = require('./controllers/userController');
const ControllerExceptionHandler = require('./controllers/controllerExceptionHandler');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies

// Security and CORS configuration
app.use(securityConfig);

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/code', codeController);
app.use('/api/common', commonController);
app.use('/api/user', userController);

// Serve static files
app.use(express.static('public'));

// Error handling middleware
app.use(ControllerExceptionHandler.handleMethodArgumentNotValidException);
app.use(ControllerExceptionHandler.handleException);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
