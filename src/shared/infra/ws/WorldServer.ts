// /**
//  * The WorldServer module is responsible for running the WSS, managing the
//  * connections to the server, and dispatching request to the World Services.
//  */
// import {log} from '../../utils/log';
// import {server as WSS} from 'websocket';
// import * as HTTP from 'http';
// const PORT = 1337;

// // CREATE WORLD SERVICES
// import {worldServices} from './routing';

// // START WEBSOCKET SERVER
// const wss = new WSS({
//   httpServer: HTTP.createServer(function(req, res) {}).listen(PORT),
// });

// // HANDLE CLIENT CONNECT
// const clients = [];
// wss.on('request', function(request) {
//   log.info('Connection from: '+ request.origin);

//   // add new connection to list of connected clients
//   const connection = request.accept(null, request.origin);
//   const index = clients.push(connection) - 1;

//   // HANDLE CLIENT SEND REQUEST
//   connection.on('message', function(request) {
//     log.info('Recieved message from connection ' + connection.remoteAddress);
//     worldServices.dispatchRequest(request)
//         .then((res) => {
//           const clientAddr = connection.remoteAddress;
//           log.info('Sending: ' + clientAddr + ' response: ' + JSON.stringify(res));
//           connection.sendUTF(res);
//         })
//         .catch((err) => {
//           const clientAddr = connection.remoteAddress;
//           log.error('Sending: ' + clientAddr + ' error: ' + JSON.stringify(err));
//           log.error(err.stack);
//           connection.sendUTF(err);
//         });
//   });

//   // HANDLE CLIENT DISCONNECT
//   connection.on('close', function(connection) {
//     log.info('Connection ' + connection.remoteAddress + ' disconnected');

//     // remove connection for list of connected clients
//     clients.splice(index, 1);
//   });
// });

// module.exports = wss;
