const express = require('express');
const router = express.Router();
const { generateTestAddress, listTestAddresses } = require('../controllers/testAddressController');


// Generate a new test address (returns `{ token, address, subject }`)
router.get('/generate', generateTestAddress);
// List recent generated addresses
router.get('/', listTestAddresses);


module.exports = router;