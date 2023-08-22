const mongoose = require('mongoose'); 

const clients = new mongoose.Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String
        }, 
        phone: {
            type: String
        }
    }
)

module.exports = mongoose.model('clients', clients); 