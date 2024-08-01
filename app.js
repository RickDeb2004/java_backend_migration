const express = require('express');
const bodyParser = require('body-parser');
const s3Config = require('./config/s3Config');
const securityConfig = require('./config/securityConfig');
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

// Serve static files
app.use(express.static('public'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something broke!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
