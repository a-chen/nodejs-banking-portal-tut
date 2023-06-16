const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const accountRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');
const {
    accounts,
    users,
    writeJson
} = require('./data');

app.use(express.static('./src/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

app.get('/', (req, res) => {
    res.redirect('/account');
});

app.get('/profile', (req, res) => {
    res.render('profile', {
        user: users[0]
    });
});

app.listen(PORT, () => {
    console.info(`Server started on port ${PORT}`);
});
