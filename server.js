var express = require('express');
var bodyParser = require('body-parser');
var logger = require('./services/logger');
var mailer = require('nodemailer');
var config = require('config');
var textCreator = require('./services/mailTextCreator');
var guidGenerator = require('./services/guidGenerator');

var app = express();

app.use(bodyParser());
logger.access.debug('app Start');

/**
 * ALL
 */
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", config.auth.accessControlAllowOrigin);
    next();
});

/**
 * GET
 */
app.get('/', function (req, res) {
    res.send('Hello, World!!!');
});

/**
 * GET agreement_register
 */
app.get('/agreement_register/', function (req, res) {
    var guid = guidGenerator.generate();
    var log = '規約への同意が行われました。[GUID]：' + guid;
    logger.access.info(log);
    res.send(guid);
})

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
        if (config.func.sendMail) {
            transporter.sendMail(mailOptions, function (err, mres) {
                if (err) {
                    logger.access.debug(err);
                }
                else {
                    logger.access.debug('Message sent: ' + mres.message);
                }
                res.send("send end");
            });
        }
        else {
            res.send("no send");
        }

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