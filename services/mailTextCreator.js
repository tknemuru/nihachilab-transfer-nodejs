/**
 * メールに関する文字列の作成機能を提供します。
 */
var mailTextCreator = {};
(function (self) {
    'use strict';
    
    /**
     * メール件名を作成します。
     */
    self.createSubject = function (request) {
        return '【www.28lab.com】動画が投稿されました';
    }
    
    /**
     * メール本文を作成します。
     */
    self.createText = function (request) {
        var text = self._createText(request.body);
        text += '\r\n\r\n' + '----------------------------------' + '\r\n';
        text += self._createHeaders(request.headers);
        return text;
    }
   
    /**
     * ヘッダ情報を作成します。
     */
    self._createHeaders = function (headers) {
        var text = '';
        for (var key in headers) {
            text += '[' + key + ']：' + headers[key] + '\r\n';
        }
        return text;
    }

    /**
     * メール本文を作成します。
     */
    self._createText = function (body) {
        var text = '[お名前]：' + body.sellerName + '\r\n';
        text += '[メールアドレス]：' + body.sellerEmail + '\r\n';
        text += '[電話番号]：' + body.sellerPhoneNumber + '\r\n';
        text += '[動画URL]：' + body.videoUrl + '\r\n';
        text += '[動画説明]：' + body.videoExplain;
        return text;
    };
})(mailTextCreator);

module.exports = mailTextCreator;