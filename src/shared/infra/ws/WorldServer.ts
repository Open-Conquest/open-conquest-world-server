/**
 * The WorldServer module is responsible for running the WSS, managing the
 * connections to the server, and dispatching requests to the World Router.
 */
import {log} from '../../utils/log';
import {server as WSS} from 'websocket';
import * as HTTP from 'http';
const PORT = 1337;

import {worldRouter} from './routing';

// START WEBSOCKET SERVER
const wss = new WSS({
  httpServer: HTTP.createServer(function(req, res) {}).listen(PORT),
});

log.info('Server started on port:' + PORT);

const clients = [];
// HANDLE CLIENT CONNECT
wss.on('request', function(request) {
  log.info('Connection from: '+ request.origin);

  // add new connection to list of connected clients
  const connection = request.accept(null, request.origin);
  const index = clients.push(connection) - 1;

  // HANDLE CLIENT SEND REQUEST
  connection.on('message', function(request) {
    log.info('Recieved message from connection ' + connection.remoteAddress);

    worldRouter.handle(JSON.parse(request.utf8Data))
        .then((res) => {
          const clientAddr = connection.remoteAddress;
          log.info('Sending: ' + clientAddr, res);
          connection.sendUTF(JSON.stringify(res));
        })
        .catch((err) => {
          const clientAddr = connection.remoteAddress;
          log.error('Sending error: ' + clientAddr, err);
          log.error(err.stack);
          connection.sendUTF(JSON.stringify(err));
        });
  });

  // HANDLE CLIENT DISCONNECT
  connection.on('close', function(connection) {
    log.info('Connection ' + connection.remoteAddress + ' disconnected');

    // remove connection for list of connected clients
    clients.splice(index, 1);
  });
});

module.exports = wss;
