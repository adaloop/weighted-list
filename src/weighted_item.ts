export class WeightedItem<T> {
  item: T
  accumulatedWeight: number

  constructor(item: T, accumulatedWeight: number) {
    this.item = item
    this.accumulatedWeight = accumulatedWeight
  }
}
