export class AboveMaxWeightError extends Error {
  constructor() {
    super("The total weight of the list can't be above the max weight")
  }
}
