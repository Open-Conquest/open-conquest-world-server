/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface GetCitiesResponse {
  cities: City[];
}
export interface City {
  name: string;
  level: number;
  row: number;
  col: number;
}
