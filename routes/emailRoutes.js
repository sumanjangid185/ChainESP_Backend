const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');


router.post('/webhook', emailController.handleWebhook);
router.get('/', emailController.listEmails);
router.get('/:id', emailController.getEmail);


module.exports = router;