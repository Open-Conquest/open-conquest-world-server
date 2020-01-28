/**
 * The WorldService dispatches request to the appropriate handler.
 */

import {log} from './utils/log';
import {logError as logError} from './utils/log';
import {Request} from './Request';
import {ArmyServices} from './services/ArmyServices';
import {MapServies} from './services/MapServices';
import {MarchServices} from './services/MarchServices';
import {TileServices} from './services/TileServices';
import {UserServices} from './services/UserServices';

export class WorldServices {
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
      'user': this.userServices,
    };
  }

  dispatchRequest(request) {
    log('WorldService received request: ' + JSON.stringify(request));

    const services = this.services;
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
          .then((res) => {
            res = JSON.stringify(res);
            log('WorldService returning response: ' + res);
            resolve(res);
          })
          .catch((err) => {
            err = JSON.stringify(err);
            reject(err);
          });
    });
  }
}

module.exports = WorldServices;
