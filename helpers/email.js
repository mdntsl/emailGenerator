const { domain } = require('process');

const { Resolver } = require('dns').promises;
const resolver = new Resolver();

const domains = ['.ua', '.com', '.uk', '.pl', '.org', '.net', '.us', '.edu.ua', '.edu'];

const domainsValidator =  async company => {
    const availableDomains = [];

    for (const dom of domains) {
        
        try {
            await resolver.resolveMx(`${company}${dom}`)
        } catch (error) {
            console.log('Not valid domain' );
            continue;
        }
        availableDomains.push(`${company}${dom}`)
      }

    return availableDomains;
}

const namesGenerator = ({name, surname}) => {
    const constructorData = [
    {name:`${name}`, surname: `${surname}`},
    {name:`${name[0]}`, surname: `${surname}`},
    {name:`${name}`, surname: `${surname[0]}`},
    {name:`${name[0]}`, surname: `${surname[0]}`},
    {name:`${name[0]}${name[1]}`, surname: `${surname[0]}${surname[1]}`},
    {name:`${name[0]}${name[1]}`, surname: `${surname}`},
    {name:`${name[0]}${name[1]}`, surname: `${surname[0]}${surname[1]}`},
    {name:`${name}`, surname: `${surname[0]}${surname[1]}`} ]

    const names = [];

    constructorData.forEach( row => {
        names.push(`${row.name}${row.surname}`);
        names.push(`${row.surname}${row.name}`);
        names.push(`${row.name}.${row.surname}`);
        names.push(`${row.surname}.${row.name}`);
        names.push(`${row.name}_${row.surname}`);
        names.push(`${row.surname}_${row.name}`);
    })

    return names;
}

module.exports = {
    domainsValidator,
    namesGenerator
}