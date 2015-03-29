/**
 * GUID生成機能を提供します。
 * @refs http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 */
var guidGenerator = {};
(function (guidGenerator) {
    'use strict';
    
    guidGenerator.generate = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };
})(guidGenerator);

module.exports = guidGenerator;