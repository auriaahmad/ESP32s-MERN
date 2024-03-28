const mongoose = require('mongoose');

// Define schema
const temperatureSchema = new mongoose.Schema({
    temp: {
        type: Number,
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Create model
const Temperature = mongoose.model('Temperature', temperatureSchema);

module.exports = Temperature;
