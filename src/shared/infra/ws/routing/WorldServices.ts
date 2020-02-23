// import {log} from '../shared/utils/log';
// import {BaseServices} from './BaseServices';
// import {ServiceNames} from './ServiceNames';
// import { MessageDTO } from '../../../dtos/MessageDTO';

// /**
//  * WorldServices is meant to route jsons to the appropriate services.
//  */
// export class WorldServices {
//   private services: Map<ServiceNames, BaseServices>;

//   /**
//    * Creates an instance of WorldServices.
//    *
//    * @memberof WorldServices
//    */
//   constructor() {
//     log.info('WorldService initialized.');
//     this.services = new Map<ServiceNames, BaseServices>();
//   }

//   /**
//    * Register a new service with WorldServices.
//    *
//    * @param {BaseServices} service
//    * @memberof WorldServices
//    */
//   registerService(service: BaseServices) {
//     this.services.set(service.serviceName, service);
//   }

//   /**
//    *
//    *
//    * @param {*} json
//    * @return {Request}
//    * @memberof WorldServices
//    */
//   dispatchRequest(json): any {
//     log.info('WorldServices received json: ' + JSON.stringify(json));

//     const services = this.services;
//     return new Promise( function(resolve, reject) {
//       try {
//         json = MessageDTO.fromJSON(json);
//       } catch (err) {
//         reject(err);
//       }
//       // check if service exists
//       if (services.get(json.service) === undefined) {
//         reject(new Error('Unrecognized service: ' + json.service));
//         return;
//       }
//       // check if user is authorized for route
//       // ensure that user is only doing something that they're allowed to...
//       // for example a user shouldn't be able to create a march for another user
//       // or something along those lines
//       // SOLUTION: jwt middleware sets the user of the request by username
//       services.get(json.service).handle(json)
//           .then((res) => {
//             const response = JSON.stringify(res);
//             log.info('WorldService returning response: ' + response);
//             resolve(res);
//           })
//           .catch((err) => {
//             err = JSON.stringify(err);
//             reject(err);
//           });
//     });
//   }
// }
