const mongoose = require('mongoose'); 

const projects = new mongoose.Schema(
    {
        name: {
            type: String
        },
        description: {
            type: String
        }, 
        status: {
            type: String, 
            enum: ['Not started', 'In Progress', 'Completed']
        }, 
        clientId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'clients', 
        }
    }
)

module.exports = mongoose.model('projects', projects); 