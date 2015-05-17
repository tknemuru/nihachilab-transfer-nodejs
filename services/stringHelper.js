/**
 * 文字列操作に関する機能を提供します。
 */
var stringHelper = {};
(function (stringHelper) {
    'use strict';
    
    /**
     * キーバリューのリストを文字列に変換します。
     */
    stringHelper.keyValuesToString = function (keyValues) {
        var str = '';
        for (var key in keyValues) {
            str += '[' + key + ']：' + keyValues[key] + '\r\n';
        }
        return str;
    };
})(stringHelper);

module.exports = stringHelper;