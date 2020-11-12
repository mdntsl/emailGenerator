const fs = require('fs');
const path = require('path');    

const filePath = path.join(__dirname, '/emails.json');

const all = ( callback) => fs.readFile(filePath, callback)

const save = (email) => {
    dataToWrite = {
        email: email,
        date: new Date()
    }

    all( (err, data) => {
        const allEmails = JSON.parse(data)
        allEmails.push(dataToWrite);

        fs.writeFile (filePath, JSON.stringify(allEmails), (err) => {
            if (err) throw err;
            console.log('complete');
        })
    })

    return dataToWrite;    
}

module.exports = {
    save
}