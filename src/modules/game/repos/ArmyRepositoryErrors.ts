export enum ArmyRepositoryErrors {
  NonexistentPlayer = 'tried to create army for nonexistent player',
  NonexistentArmy = 'army does not exist in database',
  NonexistentUnit = 'unit does not exist in database',
  InsufficientUnits = 'army does not have sufficient units to perform operation',
}
