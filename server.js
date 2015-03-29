var express = require('express');
var bodyParser = require('body-parser');
var logger = require('./services/logger');
var mailer = require('nodemailer');
var config = require('config');
var textCreator = require('./services/mailTextCreator');

var app = express();

app.use(bodyParser());
logger.access.debug('app Start');

/**
 * GET
 */
app.get('/', function (req, res) {
    logger.access.debug('log4 hello world');
    res.send('Hello, World!!!');
});

/**
 * POST
 */
app.post('/', function (req, res) {
    try {
        logger.access.debug('post Start');
        logger.access.debug(req.body);
        
        // 送信設定
        var transporter = mailer.createTransport({
            service: config.mailer.service,
            auth: {
                user: config.mailer.user,
                pass: config.mailer.pass
            }
        });
        
        // メールを作成
        var mailOptions = {
            from: config.mailer.from,
            to: config.mailer.to,
            subject: textCreator.createSubject(req.body),
            text: textCreator.createText(req)
        }
        
        // 送信実行
        logger.access.debug('sendMail Start');
        transporter.sendMail(mailOptions, function (err, mres) {
            if (err) {
                logger.access.debug(err);
            }
            else {
                logger.access.debug('Message sent: ' + mres.message);
            }
            res.send("send end");
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