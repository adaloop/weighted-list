import { WrongNumberProbabilityError } from './errors/wrong_number_probability.js'
import { MathRandomGenerator, RandomGenerator } from './random_generator.js'
import { WeightedList } from './weighted_list.js'

interface LootTableItem<T> {
  item: WeightedList<T>
  probability: number
  randomGenerator: RandomGenerator
}

export class LootTable<T> {
  private items: LootTableItem<T>[]

  constructor() {
    this.items = []
  }

  add(weightedList: WeightedList<T>, probability: number, randomGenerator?: RandomGenerator) {
    if (probability < 0 || probability > 100) {
      throw new WrongNumberProbabilityError()
    }

    randomGenerator = randomGenerator ?? new MathRandomGenerator()

    this.items.push({ item: weightedList, probability, randomGenerator })

    return this
  }

  roll(): T[] {
    const rolledItems: T[] = []

    for (const item of this.items) {
      const random = item.randomGenerator.generate(0, 100)

      if (random < item.probability) {
        const rolledItem = item.item.pickRandom()

        if (rolledItem) {
          rolledItems.push(rolledItem)
        }
      }
    }

    return rolledItems
  }
}
