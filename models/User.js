const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    age: { type: Number, min: 0 },
    address: { type: String, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);