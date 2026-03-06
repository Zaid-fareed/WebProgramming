const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const UserProcessor = require('./user'); 

const application = express();

// Senior Pattern: Environment Variable Fallbacks
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/enterpriseDB';

// Middleware Configuration
application.use(express.json());
application.use(express.urlencoded({ extended: true }));

// Senior Pattern: Hardened Session Configuration
application.use(session({
    secret: process.env.SESSION_SECRET || 'cryptographic-secure-key-123',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 2 // 2 Hour Expiration
    }
}));

// Database Initialization Pattern
const initializeDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("[DB_Connector] Connection successfully established.");
    } catch (connectionError) {
        console.error("[DB_Connector] Initialization failed:", connectionError);
        process.exit(1); // Senior Pattern: Kill server if DB fails
    }
};

// Advanced Authentication Middleware
const requireAuthentication = (req, res, next) => {
    if (!req.session || !req.session.activeUser) {
        return res.status(401).json({ 
            status: "Unauthorized", 
            message: "Authentication token required to access this resource." 
        });
    }
    next();
};

// API Routes (Controller Logic)
application.post('/api/v1/register', async (req, res) => {
    const { username, password } = req.body;
    
    // Input Sanitization
    if (!username || !password) {
        return res.status(400).json({ status: "Bad Request", message: "Malformed payload." });
    }

    const userInstance = new UserProcessor(username, password);
    const registrationResult = await userInstance.executeRegistration();
    
    if (registrationResult.success) {
        return res.status(201).json({ status: "Created", message: "Entity provisioned successfully." });
    } else {
        return res.status(409).json({ status: "Conflict", message: "Entity already exists or invalid data." });
    }
});

application.post('/api/v1/login', async (req, res) => {
    const { username, password } = req.body;
    const userInstance = new UserProcessor(username, password);
    
    const authenticationResult = await userInstance.verifyCredentials();
    
    if (authenticationResult.isAuthenticated) {
        req.session.activeUser = username; // Establish secure session
        return res.status(200).json({ status: "OK", message: "Session token established." });
    } else {
        return res.status(401).json({ status: "Unauthorized", message: "Invalid credentials provided." });
    }
});

// Protected Resource
application.get('/api/v1/dashboard', requireAuthentication, (req, res) => {
    res.status(200).json({ 
        status: "OK", 
        payload: { 
            message: `Welcome to the secure portal, ${req.session.activeUser}`,
            timestamp: new Date().toISOString()
        } 
    });
});

application.get('/api/v1/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ status: "Error", message: "Failed to terminate session." });
        res.clearCookie('connect.sid'); // Senior Pattern: Explicitly destroy the cookie
        res.status(200).json({ status: "OK", message: "Session terminated successfully." });
    });
});

// Server Bootstrap
initializeDatabase().then(() => {
    application.listen(PORT, () => {
        console.log(`[Server] API currently listening for requests on port ${PORT}`);
    });
});