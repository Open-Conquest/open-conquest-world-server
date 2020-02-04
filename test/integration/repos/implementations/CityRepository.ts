import * as chai from 'chai';
import * as mocha from 'mocha';
import {CityRepository} from '../../../../src/repos/implementations/CityRepository';
import {log} from '../../../../src/utils/log';

const expect = chai.expect;

const cityRepository = new CityRepository();

describe('CityRepository', function() {
  /**
   * This test is meant to make sure that the repo returns the expected cities
   * in the expected format `CityEntity`.
   */
  it('should get expected test cities', async function() {
    try {
      const cities = await cityRepository.getAllCities();
      expect(cities).to.be.not.null;
    } catch (err) {
      log(err);
      throw err;
    }
  });
});
