const express = require('express');
const emailController = require('./controllers/emailController');
const emailRouter = express.Router();

emailRouter.post('/generate', emailController.generateEmails);

emailRouter.post('/save', emailController.saveEmail);
emailRouter.post('/delete', emailController.deleteEmail);


emailRouter.get('/single/:email', emailController.singleEmail);
emailRouter.get('/history', emailController.savedEmails);



emailRouter.get('/', (req, res) => res.render('mainEmailPage', {title: "Email Generator"}) );

module.exports = emailRouter;