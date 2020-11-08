const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors');

const schema = require('./schema/schema');

const app = express();

dotenv.config();

app.use(express.json());

app.use(cors());

mongoose.connect(process.env.DB_URL_DEVELOPMENT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) 
        throw new Error(err);
    console.log('Successfully connected to database')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.use('/api/auth', require('./routes/auth'));
app.use('/api/organisation', require('./routes/organisations'));
app.use('/api/subject', require('./routes/subjects'));
app.use('/api/contest', require('./routes/contests'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
    if (err) 
        throw new Error(err);
    console.log(`Server running on port ${ PORT }`)
})