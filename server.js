var express = require('express');
var bodyParser = require('body-parser');
var logger = require('./services/logger');
var textCreator = require('./services/mailTextCreator');
var guidGenerator = require('./services/guidGenerator');
var mailManager = require('./services/mailManager');
var config = require('config');

var app = express();

app.use(bodyParser());
console.log('app Start');
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
    console.log('Hello, World!!!');
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
        console.log(log);
        
        // メールを送信
        var text = textCreator.getAgreementText(req, guid);
        mailManager.send(text, function () {
            console.log('send end');
        });

        res.send(guid);
    }
    catch (e) {
        console.log(e);
    }
})

/**
 * POST
 */
app.post('/', function (req, res) {
    try {
        console.log('post Start');

        // メールを送信
        var text = textCreator.getVideoPostedText(req);
        mailManager.send(text, function () {
            console.log('send end');
        });

        res.send('post End');
    }
    catch (e) {
        console.log(e);
    }
})

module.exports = app;

if (!module.parent) {
    app.listen(process.env.PORT || 5000);
}