import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../../src/utils/log';
import { cityRepository } from '../../../../src/repos/implementations';

const expect = chai.expect;

describe('CityRepository', function() {
  /**
   * This test is meant to make sure that the repo returns the expected cities
   * in the expected format `CityEntity`.
   */
  it('should get expected test cities', async function() {
    try {
      const cities = await cityRepository.getAllCities();
      expect(cities).to.be.not.null;
      throw new Error('no strong assertions implemented');
    } catch (err) {
      log(err);
      throw err;
    }
  });
});
