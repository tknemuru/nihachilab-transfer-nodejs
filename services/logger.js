var config = require('config');
var log4js = require('log4js');
log4js.configure(config.log4js.configure);

/**
 * ログ出力機能を提供します。
 */
var logger = {
    system: log4js.getLogger('system'),
    access: log4js.getLogger('access'),
    error: log4js.getLogger('error')
}
for (key in logger) {
    logger[key].setLevel(config.log4js.level);
}

module.exports = logger;