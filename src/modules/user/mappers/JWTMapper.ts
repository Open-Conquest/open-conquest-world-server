/* eslint-disable require-jsdoc */
import {JWT} from "../domain/JWT";
import {JWTDTO} from '../../../shared/dtos/JWTDTO';

/**
 * JWTMapper is responsible for mappings between the domain `JWT` and `DTO`s
 * and the domain `JWT` and its sequelize representation.
 */
export class JWTMapper {
  /** Creates an instance of JWTMapper. */
  constructor() {}

  toDTO(jwt: JWT): JWTDTO {
    return new JWTDTO(jwt.getTokenString());
  }
}
