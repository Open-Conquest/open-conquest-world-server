/* eslint-disable guard-for-in */
const fs = require('fs');

// Needs to be manually updated sorry idgaf
const ServiceNames = {
  'Army': 'army',
  'City': 'city',
  'Map': 'map',
  'March': 'march',
  'Player': 'player',
  'Tile': 'tile',
  'User': 'user',
  'World': 'world',
};

// Is manual rn as well
const ENDPOINT_COMMANDS = {
  'insert-controllers': 'insert-controllers',
};

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Store user responses like (operationName, serviceName, etc.)
const state = {
  operation: null,
  endpoint: null,
  controllers: [
    'createPlayer',
  ],
};

/**
 * Initial question asking for operation name (e.g. createNewPlayer)
 */
function createNewOperation() {
  rl.question('What is your new operation\'s name? ', function(operation) {
    state.operation = operation;
    doYouWantToCreateANewService();
  });
}

/**
 * Ask if they want to house the operation under an already existing service.
 */
function doYouWantToCreateANewService() {
  rl.question('Do you want to use an existing endpoints? ', function(create) {
    if (create.toString().toLowerCase() == 'yes' || create.toString().toLowerCase() == 'y') {
      useExistingEndpoint();
    } else {
      createNewEndpoint();
    }
  });
}

/**
 * Which service would you like to house your operation under?
 */
function useExistingEndpoint() {
  let operationNames = '[\n';
  for (const serviceName in ServiceNames) {
    operationNames += '\t' + serviceName + '\n';
  }
  operationNames += ']';
  rl.question(`Which endpoint you like to house your operation under? ` + operationNames + ' ', function(endpoint) {
    state.endpoint = endpoint;
    addOperationToEndpoint();
  });
}

/**
 * What is the name of the new service you would like to create?
 */
function createNewEndpoint() {
  rl.question('What would you like to name your new endpoints? ', function(endpoint) {
    state.endpoint = endpoint;

    const array = fs.readFileSync('./templates/Endpoints.ts').toString().split('\n');
    for (i in array) {
      // check if line contains and code generation commands
      for (command in ENDPOINT_COMMANDS) {
        // if it containts a command execute that command with the current state
        if (array[i].indexOf(command) >= 0) {
          executeEndpointCommand(array, i, command, state);
        }
      }
    }

    const fileStr = array.join('');
    fs.writeFile('./templates/TempEndpoints.ts', fileStr, function(err) {console.log(err);});
  });
}

function executeEndpointCommand(arr, i, command, state) {
  switch (command) {
    case ENDPOINT_COMMANDS['insert-controllers']:
      console.log(arr[i]);
      let x = i;
      for (controller in state.controllers) {
        const str = `${controller} = ${controller}`;
        arr.splice(x++, 0, str);
      }
      break;
  }
}


/**
 * 1. add operation to service endpoints
 * 2. add schemas for operation
 * 3. add dtos for operation's schemas
 * 4. add controller for operation
 * 5. setup DI for controller's required services
 * 6. add any new services for operation
 * 7. specify repositories required for new services
 * 8. generate code and setup DI for new services
 * 9. setup mappings for dtos?
 */


/**
 * End the program
 */
rl.on('close', function() {
  console.log('\nBYE BYE !!!');
  process.exit(0);
});


createNewOperation();
