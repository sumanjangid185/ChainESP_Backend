const crypto = require('crypto');
const TestAddress = require('../models/testAddressModel');


exports.generateTestAddress = async (req, res) => {
try {
const token = crypto.randomUUID();
const domain = process.env.TEST_EMAIL_DOMAIN || 'example.com';
const address = `${token}@${domain}`;
const subject = `ESP Test - ${token.slice(0, 8)}`;


const newAddr = new TestAddress({ token, address, subject });
await newAddr.save();


res.json({ token, address, subject });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Failed to generate test address' });
}
};


exports.listTestAddresses = async (req, res) => {
try {
const all = await TestAddress.find().sort({ createdAt: -1 }).limit(50);
res.json(all);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Failed to list test addresses' });
}
};