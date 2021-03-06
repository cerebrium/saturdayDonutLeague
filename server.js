require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')

// instatiate app
const app = express()

// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Starting up the database 
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.once('open', () => {
    console.log(`connected to mongodb on ${db.host}:${db.port}... `)
});
db.on('error', (err) => {
    console.log(`Database Error: \n${err}`)
})

app.use('/user', require('./routes/auth'));
app.use('/api', require('./routes/api'));
app.use('/team', require('./routes/team'));

app.use(express.static(__dirname + '/client/build'))

app.get('*', function(req, res) {
	res.sendFile(__dirname + '/client/build/index.html');
});

app.listen(process.env.PORT, () => {
    console.log(`server running on port: ${process.env.PORT}`)
})