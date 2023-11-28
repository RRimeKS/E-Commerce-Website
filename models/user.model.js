const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        default: "default-avatar.png"
    },
    role: {
        type: String,
        default: "User"
    },
    passwordResetCode: String,
    passwordChangedAt: Date,
    passwordResetExpires: Date,
    passwordResetVerifed: Boolean,
    resetToken: String
});

module.exports = mongoose.model("User", userSchema);