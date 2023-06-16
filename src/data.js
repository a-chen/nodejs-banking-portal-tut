const fs = require('fs');
const path = require('path');

const accountData = fs.readFileSync('./src/json/accounts.json', { encoding: 'utf-8' });
const accounts = JSON.parse(accountData);
const userData = fs.readFileSync('./src/json/users.json');
const users = JSON.parse(userData);

const writeJson = () => {
    const accountsJson = JSON.stringify(accounts, null, 4);
    fs.writeFileSync('./src/json/accounts.json', accountsJson);
};

module.exports = {
    accounts,
    users,
    writeJson
};
