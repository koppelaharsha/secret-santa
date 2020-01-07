const express = require('express');
const compressor = require('compression');
const sequelize = require('./util/db');
const sessions = require('./util/sessions');
const csrf = require('csurf');
const flash = require('connect-flash');
const helmet = require('helmet');
const hpp = require('hpp');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.locals.ROOT_PATH = '/santa';
app.use(compressor());
app.use(helmet());
app.use(require('./util/logger'));
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(hpp());
app.use(sessions);
app.use(csrf());
app.use(flash())
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(require('./middleware'));
app.use('/', require('./router') );

sequelize.sync()
    .then( result => {
        const Santa = require('./data/santa');
        Santa.findOrCreate({
            where : { id : 'lock' },
            defaults : { name : 'false'}
        }).then(([user,created]) => {
            app.listen(process.env.PORT,process.env.HOST);
        })
    }).catch( error => {
        console.log(error);
    });
