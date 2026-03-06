const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Senior Pattern: Added schema validation, trimming, and automatic timestamps
const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: [true, 'Username payload is strictly required'], 
        unique: true,
        trim: true,
        lowercase: true
    },
    password: { 
        type: String, 
        required: [true, 'Password payload is strictly required'] 
    }
}, { timestamps: true });

// Senior Pattern: Mongoose Pre-save Hook for automated cryptographic hashing
userSchema.pre('save', async function() {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return;

    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (exception) {
        throw new Error("[Auth_Service] Hashing failed: " + exception.message);
    }
});

const UserModel = mongoose.model('User', userSchema);

class UserProcessor {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    async executeRegistration() {
        try {
            const userDocument = new UserModel({ 
                username: this.username, 
                password: this.password 
            });
            const savedEntity = await userDocument.save();
            return { success: true, payload: savedEntity };
        } catch (exception) {
            console.error("[Auth_Service] Registration failed:", exception.message);
            return { success: false, error: exception.message };
        }
    }

    async verifyCredentials() {
        try {
            const existingUser = await UserModel.findOne({ username: this.username });
            if (!existingUser) return { isAuthenticated: false };

            // Senior Pattern: Securely compare the provided string with the database hash
            const isPasswordValid = await bcrypt.compare(this.password, existingUser.password);
            return { isAuthenticated: isPasswordValid, entity: existingUser };
        } catch (exception) {
            console.error("[Auth_Service] Authentication failed:", exception.message);
            return { isAuthenticated: false, error: exception.message };
        }
    }
}

module.exports = UserProcessor;