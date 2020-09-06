require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
// Mongoose ORM
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const cors = require('cors');
const colors = require('colors');

const { MONGO_USERNAME, MONGO_PASSWORD } = process.env;
const connectionString = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@graphqldeneme.itp20.mongodb.net/graphql-deneme?retryWrites=true&w=majority`;

mongoose.connect(connectionString,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected....'.black.bgCyan))
    .catch(err => console.log(err));

const app = express();

// Allowed cors while developing it
app.use(cors());
// Staticly serve react app on index
app.use('/', express.static('../client/build'));
// Route for graphiql
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

const port = 4000;
app.listen(port, () => {
    console.log(`Now listening for requests on port ${port}`.black.bgGreen)
});