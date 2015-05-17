var express = require('express');
var bodyParser = require('body-parser');
var logger = require('./services/logger');
var textCreator = require('./services/mailTextCreator');
var guidGenerator = require('./services/guidGenerator');
var mailManager = require('./services/mailManager');
var config = require('config');

var app = express();

app.use(bodyParser());
logger.access.debug('app Start');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

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
    try {
        // GUIDを生成
        var guid = guidGenerator.generate();
        var log = '規約への同意が行われました。[GUID]：' + guid;
        logger.access.info(log);
        
        // メールを送信
        var text = textCreator.getAgreementText(req, guid);
        mailManager.send(text, function () {
            logger.access.debug('send end');
        });

        res.send(guid);
    }
    catch (e) {
        logger.access.debug(e);
    }
})

/**
 * POST
 */
app.post('/', function (req, res) {
    try {
        logger.access.debug('post Start');
        logger.access.debug(req.body);

        // メールを送信
        var text = textCreator.getVideoPostedText(req);
        mailManager.send(text, function () {
            res.send('send end');
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