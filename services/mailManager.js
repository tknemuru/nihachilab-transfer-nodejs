var logger = require('./logger');
var mailer = require('nodemailer');
var config = require('config');

/**
 * メール管理機能を提供します。
 */
var mailManager = {};
(function (mailManager) {
    'use strict';
    
    /**
     * メールを送信します。
     */
    mailManager.send = function (mailText, callback) {
        // メール非送信になっている場合は、callback関数を呼び出してすぐに終了
        if (!config.func.sendMail) {
            callback(true);
        }

        // 送信設定
        var transporter = mailer.createTransport({
            service: config.mailer.service,
            auth: {
                user: config.mailer.user,
                pass: process.env.NODE_MAIL_PASS
            }
        });
        
        // メールを作成
        var mailOptions = {
            from: config.mailer.from,
            to: config.mailer.to,
            subject: mailText.subject,
            text: mailText.text
        }
        
        // 送信実行
        console.log('sendMail Start');
        transporter.sendMail(mailOptions, function (err, mres) {
            if (err) {
                console.log(err);
                callback(false);
            }
            else {
                console.log('Message send');
                console.log(mres);
                callback(true);
            }
        });
    };
})(mailManager);

module.exports = mailManager;