const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const daySchema = new Schema ({
    date: { type: Date, required: true },
    anxiety: { type: String, required: true },
    smiles: { type: String, required: true },
}, {
    timestamps: true,
});

const Day = mongoose.model('Day', daySchema);

module.exports = Day;