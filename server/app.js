require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const users = require('./routes/users.js')
// const tags = require('./routes/tags.js')

mongoose.connect('mongodb://localhost/myapp_db');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('*****mongoose connected*****');
});

app.use('/users', users);
// app.use('/tags', tags)

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`connected to ${port}`)
})