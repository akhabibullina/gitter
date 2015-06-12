/**
 * Filename: log.js
 *
 * Lightweight logger with different logging levels.
 *
 * Default log level: DEBUG.
 */

define(function () {

  var LOG_LEVELS = {
    NONE: 1,
    DEBUG: 2,
    ALL: 3
  };

  var defaultLogLevel = LOG_LEVELS.DEBUG;

  return {
    'out': function(msg, level) {
      var msg = msg || '';
      var level = level || defaultLogLevel;
      if (level > LOG_LEVELS.NONE) {
        // todo: add module name as well
        console.log('[GITTER]: ' + msg);
      }
    }
  };

});
