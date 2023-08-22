const express = require('express');
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql');
require('dotenv').config();

const schema = require('./Schema/schema');
const connectDB = require('./Config/db'); 
const PORT = process.env.PORT || 7000;

connectDB(); 
const app = express();

app.use(cors())
app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: process.env.NODE_ENV === 'development'
    }))

app.listen(PORT, () => {
    console.log("Graph ql server running on " + PORT)
})