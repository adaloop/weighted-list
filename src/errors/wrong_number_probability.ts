export class WrongNumberProbabilityError extends Error {
  constructor() {
    super('Probability must be a number between 0 and 100')
  }
}
