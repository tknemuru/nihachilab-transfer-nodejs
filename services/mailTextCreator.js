var MailText = require('../models/MailText');
var stringHelper = require('./stringHelper');

/**
 * メールに関する文字列の作成機能を提供します。
 */
var mailTextCreator = {};
(function (mailTextCreator) {
    'use strict';
    
    /**
     * 投稿用のメール文を取得します。
     */
    mailTextCreator.getVideoPostedText = function (request) {
        var subject = '【www.28lab.com】動画が投稿されました';
        var text = '';
        text += '[GUID]：' + request.body.id + '\r\n';
        text += '[お名前]：' + request.body.sellerName + '\r\n';
        text += '[メールアドレス]：' + request.body.sellerEmail + '\r\n';
        text += '[電話番号]：' + request.body.sellerPhoneNumber + '\r\n';
        text += '[動画URL]：' + request.body.videoUrl + '\r\n';
        text += '[動画説明]：\r\n' + request.body.videoExplain;
        text += '\r\n\r\n' + '----------------------------------' + '\r\n';
        text += stringHelper.keyValuesToString(request.headers);

        return new MailText(subject, text);
    }
    
    /**
     * 規約同意用のメール文を取得します。
     */
    mailTextCreator.getAgreementText = function (request, guid) {
        var subject = '【www.28lab.com】規約への同意が行われました';
        var text = '';
        text += '[GUID]：' + guid + '\r\n';
        text += '\r\n\r\n' + '----------------------------------' + '\r\n';
        text += stringHelper.keyValuesToString(request.headers);
        
        return new MailText(subject, text);
    }
})(mailTextCreator);

module.exports = mailTextCreator;