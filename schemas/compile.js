/**
 * Script that uses json-schema-to-typescript to compile json schemas
 * to TypeScript.
 */

const fs = require('fs');
const compileFromFile = require('json-schema-to-typescript').compileFromFile;

/**
 * Generates TypeScript files for all of the json schema definitions
 * in this directory.
 */
async function generate() {
  // get all of the files in this directory
  fs.readdirSync(__dirname)
      .filter((file) => {
        // filter include files with pattern *.json
        return (file.indexOf('.') !== 0) && (file.slice(-5) === '.json');
      })
      .forEach(async (file) => {
        // compile & write ts file for each json schema file
        fs.writeFileSync(
            __dirname + '/../src/schemas/' + file.substring(0, file.length-5) + '.ts',
            await compileFromFile(file),
        );
      });
}

generate();
