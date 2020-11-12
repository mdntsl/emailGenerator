const express = require('express');
const emailController = require('./controllers/emailController');
const emailRouter = express.Router();

emailRouter.post('/generate', emailController.generator);

emailRouter.get('/', (req, res) => res.render('mainEmailPage', {title: "Email Generator"}) );

module.exports = emailRouter;