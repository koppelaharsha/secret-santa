const session = require('express-session');
const MySQLstore = require('express-mysql-session')(session);
const { mysqlCredentials, session_secret } = require('../data/keys');

const sessionStore = new MySQLstore({
    host: mysqlCredentials.hostname,
    port: '3306',
    user: mysqlCredentials.username,
    password: mysqlCredentials.password,
    database: mysqlCredentials.database
});

module.exports = session({
    secret: session_secret,
    key: 'sessionid',
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: Date.now() + 86400000
    }
});
