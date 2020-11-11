const express = require('express');
const emailRouter = express.Router();

emailRouter.post('/generate', (req, res) => res.end(req.body.name));

emailRouter.get('/', (req, res) => res.render('mainEmailPage', {title: "Email Generator"}) );

module.exports = emailRouter;