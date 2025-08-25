require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');


const emailRoutes = require('./routes/emailRoutes');
const testAddressRoutes = require('./routes/testAddressRoutes');


const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));


app.use('/api/emails', emailRoutes);
app.use('/api/test-address', testAddressRoutes);


app.get('/', (req, res) => res.send('Email Processor Backend running'));


const PORT = process.env.PORT || 5000;


connectDB()
.then(() => {
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => {
console.error('DB connection failed', err);
process.exit(1);
});