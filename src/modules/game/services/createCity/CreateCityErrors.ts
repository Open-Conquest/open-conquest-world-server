export enum CreateCityErrors {
  DuplicateCityname = 'city name is taken',
  NonexistentPlayer = 'player city is being created for does not exist',
  NonexistentTile = 'tile for city does not exist',
  UnknownError = 'unknown error in creaty city service',
}
