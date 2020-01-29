/**
 * The WorldServer module is responsible for running the WSS, managing the
 * connections to the server, and dispatching request to the World Services.
 */
import {log} from './utils/log';
import {logError as logError} from './utils/log';
import {server as WSS} from 'websocket';
import * as HTTP from 'http';
const PORT = 1337;

// CREATE WORLD SERVICES
import {WorldServices} from './WorldServices';
import {ArmyServices} from './services/ArmyServices';
import {CityServices} from './services/CityServices';
import {MapServices} from './services/MapServices';
import {MarchServices} from './services/MarchServices';
import {TileServices} from './services/TileServices';
import {UserServices} from './services/UserServices';
const worldServices = new WorldServices(
    new ArmyServices(),
    new CityServices(),
    new MapServices(),
    new MarchServices(),
    new TileServices(),
    new UserServices(),
);

// START WEBSOCKET SERVER
const wss = new WSS({
  httpServer: HTTP.createServer(function(req, res) {}).listen(PORT),
});

// HANDLE CLIENT CONNECT
const clients = [];
wss.on('request', function(request) {
  log('Connection from: '+ request.origin);

  // add new connection to list of connected clients
  const connection = request.accept(null, request.origin);
  const index = clients.push(connection) - 1;

  // HANDLE CLIENT SEND REQUEST
  connection.on('message', function(request) {
    log('Recieved message from connection ' + connection.remoteAddress);
    worldServices.dispatchRequest(request)
        .then((res) => {
          const clientAddr = connection.remoteAddress;
          log('Sending: ' + clientAddr + ' response: ' + JSON.stringify(res));
          connection.sendUTF(res);
        })
        .catch((err) => {
          const clientAddr = connection.remoteAddress;
          logError('Sending: ' + clientAddr + ' error: ' + JSON.stringify(err));
          logError(err.stack);
          connection.sendUTF(err);
        });
  });

  // HANDLE CLIENT DISCONNECT
  connection.on('close', function(connection) {
    log('Connection ' + connection.remoteAddress + ' disconnected');

    // remove connection for list of connected clients
    clients.splice(index, 1);
  });
});

module.exports = wss;
