const mongoose = require('mongoose');
const Clients = require('../Models/Clients')

const connectDB = async () => {
    const connect = await mongoose.connect(process.env.MONGO_URI)

    console.log(`Mongo connected: ${connect.connection.host}`);        
}

module.exports = connectDB; 