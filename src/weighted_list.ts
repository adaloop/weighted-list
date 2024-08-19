import { AboveMaxWeightError } from './errors/above_max_weight_error.js'
import { WeightedItem } from './weighted_item.js'

export class WeightedList<T> {
  private items: WeightedItem<T>[]
  private maxWeight: number
  private accumulatedWeight: number

  constructor(maxWeight: number = 100) {
    this.items = []
    this.maxWeight = maxWeight
    this.accumulatedWeight = 0
  }

  add(item: T, weight: number) {
    if (this.accumulatedWeight + weight > this.maxWeight) {
      throw new AboveMaxWeightError()
    }

    this.accumulatedWeight += weight
    this.items.push(new WeightedItem(item, this.accumulatedWeight))
  }

  clear() {
    this.items = []
    this.accumulatedWeight = 0
  }

  pick(weight: number): T | null {
    const pickedItem = this.items.find((item) => item.accumulatedWeight >= weight)

    if (!pickedItem) {
      return null
    }

    return pickedItem.item
  }

  pickRandom(): T | null {
    const random = Math.random() * this.accumulatedWeight
    return this.pick(random)
  }

  getItems(): T[] {
    return this.items.map((item) => item.item)
  }

  getAccumulatedWeight(): number {
    return this.accumulatedWeight
  }

  getEmptyWeight(): number {
    return this.maxWeight - this.accumulatedWeight
  }
}
