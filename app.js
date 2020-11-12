const express = require('express');
const bodyParser = require('body-parser')
const emailRouter = require('./routs/emailRouts')
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/email', emailRouter);

app.listen('3000', () => console.log('App listening on port 3000'))