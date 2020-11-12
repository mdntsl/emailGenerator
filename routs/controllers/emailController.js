const emailHelpers = require('../../helpers/email');
const emailModel = require('../../models/email/emailModel')

const generator = async ( req, res ) => {
    const {name, surname, company} = req.body;
    const availableEmails = [];

    const domains = await emailHelpers.domainsValidator(company);
    const emailNames = await emailHelpers.namesGenerator({ name, surname });
    
    domains.forEach( dom => {
        emailNames.forEach( name => availableEmails.push(`${name}@${dom}`));
    });

    res.render( "availableEmailsPage", {availableEmails});

}

const saver = async ( req, res) => {
    const email = req.body.email;

    try {
        emailModel.save(email)
    } catch (err) {
        res.render("errorPage", {Error: err})
        res.end();
    }
    res.end();

}

module.exports = {
    generateEmails: generator,
    saveEmail: saver
}