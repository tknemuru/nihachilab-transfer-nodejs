var express = require('express');
var bodyParser = require('body-parser');
var logger = require('./services/logger');
var mailer = require('nodemailer');
var config = require('config');

var app = express();

app.use(bodyParser.json({ extended: true }));
logger.access.debug('app Start');

app.get('/', function (req, res) {
    logger.access.debug('log4 hello world');
    res.send('Hello, World!!!');
});

app.post('/', function (req, res) {
    try {
        logger.access.debug('post Start');
        
        var transporter = mailer.createTransport({
            service: config.mailer.service,
            auth: {
                user: config.mailer.user,
                pass: config.mailer.pass
            }
        });
        
        var mailOptions = {
            from: config.mailer.from,
            to: config.mailer.to,
            subject: 'テスト件名',
            text: 'テスト本文'
        }
        
        logger.access.debug('sendMail Start');
        transporter.sendMail(mailOptions, function (err, res) {
            if (err) {
                logger.access.debug(err);
            }
            else {
                logger.access.debug('Message sent: ' + res.message);
            }
        });

        logger.access.debug('post End');
    }
    catch (e) {
        logger.access.debug(e);
    }
})

module.exports = app;

if (!module.parent) {
    app.listen(process.env.PORT || 5000);
}