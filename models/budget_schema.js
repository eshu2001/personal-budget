// models/budget_schema.js
const mongoose = require('mongoose');

// Define the Budget schema
const budgetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    value: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true,
        match: /^#[0-9A-Fa-f]{6}$/ // Enforce valid 6-digit hex color
    }
}, {
    collection: 'budgets', // MongoDB collection name
    timestamps: true       // optional: adds createdAt & updatedAt
});

// Export the model
module.exports = mongoose.model('Budget', budgetSchema);
