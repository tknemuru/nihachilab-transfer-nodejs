/**
 * メールテキスト
 */
var mailText = (function () {
    function mailText(subject, text) {
        this.subject = subject;
        this.text = text;
    }
    return mailText;
})();

module.exports = mailText;