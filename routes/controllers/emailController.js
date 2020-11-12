const emailHelpers = require('../../helpers/email');
const emailModel = require('../../models/email/emailModel')

const generator = async ( req, res ) => {
    const {name, surname, company} = req.body;
    const validatedEmails = [];
    const emailsFromHistoty = await emailModel.all();

    const domains = await emailHelpers.domainsValidator(company);
    const emailNames = await emailHelpers.namesGenerator({ name, surname });
    
    domains.forEach( dom => {
        emailNames.forEach( name => validatedEmails.push(`${name}@${dom}`));
    });

    const availableEmails = validatedEmails.filter( validatedEmails => emailsFromHistoty
        .every( historyEmail => (historyEmail.email != validatedEmails)
        )
    )
    console.log(availableEmails)


    res.render( "availableEmailsPage", {availableEmails});
    res.end();
}

const saver = async ( req, res) => {
    const email = req.body.email;
    try {
        const emailInfo = await emailModel.save(email);
        res.redirect(`/email/single/${emailInfo.email}`);
    } catch (error) {
        
    }
    res.end()
   
}

const single = async (req, res) => {
    const email = req.params.email;
    const emailInfo = await emailModel.singleLookup(email);
    res.render("singleEmailPage", emailInfo)
}

const saved = async (req, res) => {
    const savedEmails = await emailModel.all();
    res.render("savedEmails", {savedEmails});
    res.end();
}

const deleteEmail = async (req, res) => {
    const email = req.body.email;

    await emailModel.deleteEmail(email)
    res.redirect("/email/history");
}

module.exports = {
    generateEmails: generator,
    saveEmail: saver,
    singleEmail: single,
    savedEmails: saved,
    deleteEmail
}