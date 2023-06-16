const express = require('express');
const router = express.Router();
const data = require('../data');
const {
    accounts,
    users
} = require('../data');

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Account Summary',
        accounts
    });
});

router.get('/profile', (req, res) => {
    res.render('profile', {
        user: users[0]
    });
});

router.get('/checking', (req, res) => {
    res.render('account', {
        account: accounts.checking
    });
});

router.get('/savings', (req, res) => {
    res.render('account', {
        account: accounts.savings
    });
});

router.get('/credit', (req, res) => {
    res.render('account', {
        account: accounts.credit
    });
});

module.exports = router;
