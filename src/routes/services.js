const express = require('express');

const router = express.Router();
const {
    accounts,
    writeJson
} = require('../data');

router.get('/transfer', (req, res) => {
    res.render('transfer');
});

router.post('/transfer', (req, res) => {
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
    writeJson();
    res.render('transfer', {
        message: 'Transfer Complete'
    });
});

router.get('/payment', (req, res) => {
    res.render('payment', {
        account: accounts.credit
    });
});

router.post('/payment', (req, res) => {
    accounts.credit.balance -= parseInt(req.body.amount, 10);
    accounts.credit.available += parseInt(req.body.amount, 10);
    writeJson();
    res.render('payment', {
        message: 'Payment Successful',
        account: accounts.credit
    });
});

module.exports = router;
