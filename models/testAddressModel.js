const mongoose = require('mongoose');


const TestAddressSchema = new mongoose.Schema({
token: { type: String, required: true, unique: true },
address: { type: String, required: true, unique: true },
subject: { type: String, required: true },
active: { type: Boolean, default: true },
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('TestAddress', TestAddressSchema);