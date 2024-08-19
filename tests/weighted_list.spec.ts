import { test } from '@japa/runner'
import { WeightedList } from '../src/weighted_list.js'

test.group('WeightedList', () => {
  test('should throw an error when max weight is exceeded', ({ assert }) => {
    const weightedList = new WeightedList<string>(10)

    weightedList.add('item', 10)

    assert.throws(() => {
      weightedList.add('item', 1)
    })
  })

  test('should get utility methods', ({ assert }) => {
    const weightedList = new WeightedList<string>(100)

    weightedList.add('item', 10)
    weightedList.add('item2', 20)
    weightedList.add('item3', 30)

    assert.deepEqual(weightedList.getItems(), ['item', 'item2', 'item3'])
    assert.equal(weightedList.getAccumulatedWeight(), 60)
    assert.equal(weightedList.getEmptyWeight(), 40)
  })

  test('should pick an item', ({ assert }) => {
    const weightedList = new WeightedList<string>(100)

    weightedList.add('item', 40)
    weightedList.add('item2', 30)
    weightedList.add('item3', 30)

    assert.equal(weightedList.pick(20), 'item')
    assert.equal(weightedList.pick(45), 'item2')
    assert.equal(weightedList.pick(85), 'item3')
  })

  test('should pick an empty item', ({ assert }) => {
    const weightedList = new WeightedList(100)

    assert.isNull(weightedList.pick(0))
    assert.isNull(weightedList.pick(50))
    assert.isNull(weightedList.pick(100))
  })

  test('should pick a random item', ({ assert }) => {
    const weightedList = new WeightedList<string>(100)

    weightedList.add('item', 40)
    weightedList.add('item2', 30)
    weightedList.add('item3', 30)

    const picked = weightedList.pickRandom()

    assert.isNotNull(picked)
    assert.include(['item', 'item2', 'item3'], picked!)
  })

  test('should pick a random empty item', ({ assert }) => {
    const weightedList = new WeightedList<string>(100)

    const picked = weightedList.pickRandom()

    assert.isNull(picked)
  })

  test('should clear the list', ({ assert }) => {
    const weightedList = new WeightedList<string>(100)

    weightedList.add('item', 40)
    weightedList.add('item2', 30)
    weightedList.add('item3', 30)

    weightedList.clear()

    assert.isEmpty(weightedList.getItems())
    assert.equal(weightedList.getAccumulatedWeight(), 0)
    assert.equal(weightedList.getEmptyWeight(), 100)
  })
})
