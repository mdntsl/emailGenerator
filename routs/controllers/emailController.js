const emailHelpers = require('../../helpers/email');

const generator = async ( req, res ) => {
    const {name, surname, company} = req.body;
    const availableEmails = [];

    const domains = await emailHelpers.domainsValidator(company);
    const emailNames = await emailHelpers.namesGenerator({ name, surname });
    
    domains.forEach( dom => {
        emailNames.forEach( name => availableEmails.push(`${name}@${dom}`));
    })
    res.send( availableEmails);

}

module.exports = {
    generator
}