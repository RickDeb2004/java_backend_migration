const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('./config'); // Assume you have a config.js with allowed origins and other settings

const app = express();

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3000', // Update as needed
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Access-Control-Allow-Origin', 'Authorization', 'Content-Type'],
    credentials: true
};
app.use(cors(corsOptions));

// JWT authentication middleware
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, config.jwtSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// Routes that do not require authentication
const whitelistedRoutes = [
    '/', '/index.html', '/static/**', '/asset-manifest.json',
    '/favicon.ico', '/loader.gif', '/manifest.json', '/robots.txt',
    '/platform-datavidhya/', '/login/callback', '/dashboard', 
    '/create-question', '/view-question', '/solve-question/**', 
    '/api/user/question/**', '/api/code/**'
];

app.use((req, res, next) => {
    if (whitelistedRoutes.some(route => req.path.startsWith(route))) {
        return next();
    } else {
        return authenticateJWT(req, res, next);
    }
});

module.exports = app;
