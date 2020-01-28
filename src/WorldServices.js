/**
 * The WorldService dispatches request to the appropriate handler.
 */

const log           = require('./utils/log');
const logError      = require('./utils/log').logError;
const Request       = require('./Request');
const ArmyServices  = require('./services/ArmyServices');
const MapServies    = require('./services/MapServices');
const MarchServices = require('./services/MarchServices');
const TileServices  = require('./services/TileServices');
const UserServices  = require('./services/UserServices');

class WorldServices {

  constructor(armyServices, cityServices, mapServices, marchServices, tileServices, userServices) {
    log('WorldService initialized.');
    this.armyServices = armyServices;
    this.cityServices = cityServices;
    this.mapServices = mapServices;
    this.marchServices = marchServices;
    this.tileServices = tileServices;
    this.userServices = userServices;
    this.services = {
      'army': this.armyServices,
      'city': this.cityServices,
      'map': this.mapServices,
      'march': this.marchServices,
      'tile': this.tileServices,
      'user': this.userServices
    };
  }

  dispatchRequest(request) {
    log('WorldService received request: ' + JSON.stringify(request));

    let services = this.services;
    return new Promise( function(resolve, reject) {
      try {
        request = new Request.fromRequest(request);
      } catch (err) {
        reject(err);
      }
      /**
       * ADD BETTER LOGGING, IT ALREADY HATH SPILLITH BLOOD
       */
      services[request.service].handle(request)
        .then(res => {
          res = JSON.stringify(res);
          log('WorldService returning response: ' + res);
          resolve(res);
        })
        .catch(err => {
          err = JSON.stringify(err);
          reject(err);
        });
    });

  }
}

module.exports = WorldServices;
