const { domain } = require('process');

const { Resolver } = require('dns').promises;
const resolver = new Resolver();

const domains = ['.ua', '.com', '.uk', '.pl', '.org', '.net', '.us', '.edu.ua', '.edu'];

const mxValidation = async ( domain ) => {
    try {
        await resolver.resolveMx(domain);
    } catch (error) {
        return false;
    }
        return true;
}

const domainsValidator =  async company => {
    const availableDomains = [];

    for (const dom of domains) {
        const mxResult = await mxValidation(`${company}${dom}`);
        if ( mxResult ) availableDomains.push(`${company}${dom}`);
      }

    return availableDomains;
}

const namesGenerator = ({name, surname}) => {
    const names = [];
    const symbols = ['','.','_',]
    const constructorData = [
    {name:`${name}`, surname: `${surname}`},
    {name:`${name[0]}`, surname: `${surname}`},
    {name:`${name}`, surname: `${surname[0]}`},
    {name:`${name[0]}`, surname: `${surname[0]}`},
    {name:`${name[0]}${name[1]}`, surname: `${surname[0]}${surname[1]}`},
    {name:`${name[0]}${name[1]}`, surname: `${surname}`},
    {name:`${name[0]}${name[1]}`, surname: `${surname[0]}${surname[1]}`},
    {name:`${name}`, surname: `${surname[0]}${surname[1]}`} ]

    constructorData.forEach( row => {
        symbols.forEach( symbol  => {
            names.push(`${row.name}${symbol}${row.surname}`);
            names.push(`${row.surname}${symbol}${row.name}`);
        })
    })

    return names;
}

module.exports = {
    domainsValidator,
    namesGenerator
}