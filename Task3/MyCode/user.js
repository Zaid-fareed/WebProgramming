const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const UserDb = mongoose.model('User', userSchema);

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    async register() {
        try {
            let u = new UserDb({ 
                username: this.username, 
                password: this.password 
            });
            await u.save();
            return true;
        } catch (err) {
            console.log("error in register", err);
            return false;
        }
    }

    async login() {
        try {
            let u = await UserDb.findOne({ 
                username: this.username, 
                password: this.password 
            });
            
            if (u) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log("error in login", err);
            return false;
        }
    }
}

module.exports = User;