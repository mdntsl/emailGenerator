const fs = require('fs');
const path = require('path');    

const filePath = path.join(__dirname, '/emails.json');

const all = () =>JSON.parse( fs.readFileSync(filePath) )

const save = async (email) => {
    dataToWrite = {
        email: email,
        date: new Date()
    }
    const allEmails = await all()
    allEmails.push(dataToWrite);
    fs.writeFile (filePath, JSON.stringify(allEmails), (err) => {
        if (err) throw err;
        console.log('complete');
    })
    
    return dataToWrite;    
}

const singleLookup = async (email) => {
    const allEmails = await all();
    const emailInfo = allEmails.find( element =>  element.email == email);
    
    if (typeof(emailInfo) == 'undefined') return Error('Email not found')
    return emailInfo;
}

const deleteEmail = async ( email ) => {
    const allEmails = await all();
    const indexToDelete = allEmails.findIndex(element => element.email == email);
    allEmails.splice(indexToDelete,1)
    
    fs.writeFile (filePath, JSON.stringify(allEmails), (err) => {
        if (err) throw err;
        console.log('deleted');
    })
}

module.exports = {
    save,
    all,
    singleLookup,
    deleteEmail
}