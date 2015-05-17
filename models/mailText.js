/**
 * メールテキスト
 */
var MailText = (function () {
    function MailText(subject, text) {
        this.subject = subject;
        this.text = text;
    }
    return MailText;
})();

module.exports = MailText;