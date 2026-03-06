const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const UserClass = require('./user'); 

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/studentDB')
    .then(() => { console.log("Connected to db"); })
    .catch((err) => { console.log(err); });

app.use(session({
    secret: 'secret123',
    resave: false,
    saveUninitialized: false
}));

function checkAuth(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.send("Not logged in");
    }
}

app.post('/register', async (req, res) => {
    let userObj = new UserClass(req.body.username, req.body.password);
    let result = await userObj.register();
    
    if (result == true) {
        res.send("User registered successfully");
    } else {
        res.send("Error registering");
    }
});

app.post('/login', async (req, res) => {
    let userObj = new UserClass(req.body.username, req.body.password);
    let result = await userObj.login();
    
    if (result == true) {
        req.session.user = req.body.username;
        res.send("Login successful");
    } else {
        res.send("Wrong login");
    }
});

app.get('/dashboard', checkAuth, (req, res) => {
    res.send("Welcome " + req.session.user);
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.send("Logout successful");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});