require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const users = require('./routes/users.js')
const posts = require('./routes/posts.js')
const comments = require('./routes/comments.js')

mongoose.connect(`mongodb://${process.env.DBUSER}:${process.env.DBPASS}@ds163870.mlab.com:63870/my_app`);

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
app.use('/posts', posts);
app.use('/comments', comments);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`connected to ${port}`)
})