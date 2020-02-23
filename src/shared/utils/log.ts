/* eslint-disable */
const {createLogger, format, transports} = require('winston');
const {combine, timestamp, printf} = format;

const myFormat = printf(({level, message, timestamp}) => {
  // return JSON.stringify(message, null, '\t');
  return `{
    "time" : "${timestamp}",
    "level" : "${level}",
    "message" : ${message}
}\n`;
});

const logger = createLogger({
  format: combine(
      format.colorize(),
      timestamp(),
      myFormat,
  ),
  transports: [
    new transports.Console({
      json: true
    })
  ],
});

function info(message: string, data?: any) {
  if (data === undefined) {
    logger.info(message);
  } else {
    const textJSON =  {
      'message': message,
      'data': data 
    };
    logger.info(JSON.stringify(textJSON, null, '\t'));
  }
}


function error(message: string, data?: any) {
  if (data === undefined) {
    logger.error(message);
  } else {
    const textJSON =  {
      'message': message,
      'data': data
    };
    logger.error(JSON.stringify(textJSON, null, '\t'));
  }
}

const log = {
  info,
  error
}

export {log};
