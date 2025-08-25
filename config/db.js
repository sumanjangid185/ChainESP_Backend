const mongoose = require('mongoose');


module.exports = async function connectDB() {
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/email_processor';
await mongoose.connect(uri, {
useNewUrlParser: true,
useUnifiedTopology: true
});
console.log('MongoDB connected');
};