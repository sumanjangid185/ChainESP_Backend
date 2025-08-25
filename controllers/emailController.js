const Email = require('../models/emailModel');
const TestAddress = require('../models/testAddressModel');
const { parseEmailHeadersAndDetectESP } = require('../utils/emailParser');


exports.handleWebhook = async (req, res) => {
try {
const body = req.body || {};


// flexible extraction of common fields from webhooks
const subject = (body.subject || (body.headers && body.headers.subject) || '').toString();
const toField = body.to || body.envelope_to || (body.headers && body.headers.to) || '';
const fromField = body.from || (body.headers && body.headers.from) || '';


// attempt to find related test address by subject or token in the 'to' address
let test = null;
if (subject) test = await TestAddress.findOne({ subject });


if (!test && toField) {
const addr = Array.isArray(toField) ? toField[0] : toField;
const m = addr && addr.match(/([^@]+)@/);
if (m) test = await TestAddress.findOne({ token: m[1] });
}


if (!test) {
console.warn('No matching test address for incoming mail — storing anyway (subject: %s)', subject);
}


const headers = body.headers || body.rawHeaders || {};
const raw = body.raw || body.text || body.html || '';


const { receivingChain, espType } = parseEmailHeadersAndDetectESP(headers, { from: fromField, subject });


const emailDoc = new Email({
subject,
from: fromField,
to: Array.isArray(toField) ? toField : [toField],
headers,
raw,
receivingChain,
espType
});


await emailDoc.save();


res.json({ ok: true, id: emailDoc._id, espType, receivingChain });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Failed to process email' });
}
};


exports.listEmails = async (req, res) => {
const emails = await Email.find().sort({ createdAt: -1 }).limit(100);
res.json(emails);
};


exports.getEmail = async (req, res) => {
const id = req.params.id;
const email = await Email.findById(id);
};
