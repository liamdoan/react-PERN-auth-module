const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    lasLogin: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpiresAt: {
        type: Date
    },
    verificationToken: {
        type: String
    },
    verificationTokenExpiresAt: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
