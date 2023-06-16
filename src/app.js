const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./src/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

const accountData = fs.readFileSync('./src/json/accounts.json', { encoding: 'utf-8' });
const accounts = JSON.parse(accountData);
const userData = fs.readFileSync('./src/json/users.json');
const users = JSON.parse(userData);

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Account Summary',
        accounts
    });
});

app.get('/profile', (req, res) => {
    res.render('profile', {
        user: users[0]
    });
});

app.get('/checking', (req, res) => {
    res.render('account', {
        account: accounts.checking
    });
});

app.get('/savings', (req, res) => {
    res.render('account', {
        account: accounts.savings
    });
});

app.get('/credit', (req, res) => {
    res.render('account', {
        account: accounts.credit
    });
});

app.get('/transfer', (req, res) => {
    res.render('transfer');
});

app.post('/transfer', (req, res) => {
    const {
        from,
        amount,
        to
    } = req.body;

    // TODO make sure accounts have enough money
    accounts[from].prior_balance = accounts[from].balance;
    accounts[to].prior_balance = accounts[to].balance;
    accounts[from].balance -= parseInt(amount, 10);
    accounts[to].balance += parseInt(amount, 10);
    fs.writeFileSync('./src/json/accounts.json', JSON.stringify(accounts));
    res.render('transfer', {
        message: 'Transfer Complete'
    });
});

app.listen(PORT, () => {
    console.info(`Server started on port ${PORT}`);
});
