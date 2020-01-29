const {transports, createLogger, format} = require('winston');

const logger = createLogger({
  // format: format.combine(
  //   format.timestamp(),
  //   format.json()
  // ),
  transports: [
    new transports.Console({
      json: true,
    }),
    // new transports.File({filename: '../../logs/error/error.log', level: 'error'}),
    // new transports.File({filename: '../../logs/activity/activity.log', level:'info'})
  ],
});

logger.info('Logging started.');

/**
 *
 *
 * @export
 * @param {*} msg
 */
function log(msg) {
  logger.info(msg);
}

/**
 *
 *
 * @export
 * @param {*} msg
 */
function logError(msg) {
  logger.error(msg);
}

export {log, logError};
