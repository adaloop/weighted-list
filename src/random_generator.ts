export interface RandomGenerator {
  generate(min?: number, max?: number): number
}

export class MathRandomGenerator implements RandomGenerator {
  generate(min: number = 0, max: number = 100): number {
    return Math.random() * (max - min) + min
  }
}

export class FakeRandomGenerator implements RandomGenerator {
  constructor(private readonly generatedNumber: number) {}

  generate(_min?: number, _max?: number): number {
    return this.generatedNumber
  }
}
