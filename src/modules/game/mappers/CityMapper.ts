import {City} from '../domain/City';
import {CityFactory} from '../factories/CityFactory';
// import {CityDTO} from '../dtos/CityDTO';

/**
 * CityMapper is responsible for mappings between the domain `City`
 * and the persistence (sequelize) representation of a city.
 */
export class CityMapper {
  private cityFactory: CityFactory

  /** Creates an instance of CityMapper. */
  constructor() {
    this.cityFactory = new CityFactory();
  }

  /**
   * Create a domain entity `City` from a sequelize object.
   *
   * @param {*} dbCity
   * @return {City}
   * @memberof CityMapper
   */
  fromPersistence(dbCity: any): City {
    if (dbCity === null) {
      return null;
    }

    return this.cityFactory.createCity(
        dbCity.city_id,
        dbCity.city_name,
        dbCity.city_level,
    );
  }

  // /**
  //  * Create a city entity from the dto.
  //  *
  //  * @param {CityDTO} dto
  //  * @return {City}
  //  * @memberof CityMapper
  //  */
  // fromDTO(dto: CityDTO): City {
  //   // return this.cityFactory.createCity(
  //   //     null,
  //   //     dto.$name,
  //   // );
  //   throw new Error('no impl');
  // }

  // /**
  //  * Create a dto from a city entity.
  //  *
  //  * @param {City} city
  //  * @return {CityDTO}
  //  * @memberof CityMapper
  //  */
  // toDTO(city: City): CityDTO {
  //   // return new CityDTO(
  //   //     city.getNameString(),
  //   // );
  //   throw new Error('no impl');
  // }
}
