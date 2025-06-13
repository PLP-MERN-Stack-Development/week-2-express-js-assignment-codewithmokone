require('dotenv').config()

// apiKeyAuth.js
const API_KEY = process.env.USER_PASS;

const apiKeyAuth = (req, res, next) => {
    const clientApiKey = req.headers['x-api-key'];

    if (!clientApiKey) return res.status(401).json({error: 'API key missing'});

    if (clientApiKey !== API_KEY) return res.status(403).json({error: 'Invalid API key'});

    next();
};

module.exports = apiKeyAuth;