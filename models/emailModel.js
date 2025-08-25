const mongoose = require('mongoose');


const EmailSchema = new mongoose.Schema({
subject: String,
from: String,
to: [String],
headers: mongoose.Schema.Types.Mixed,
raw: String,
receivingChain: [{ server: String, raw: String }],
espType: String,
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Email', EmailSchema);