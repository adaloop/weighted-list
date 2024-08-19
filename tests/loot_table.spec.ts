import { test } from '@japa/runner'
import { LootTable } from '../src/loot_table.js'
import { WeightedList } from '../src/weighted_list.js'
import { FakeRandomGenerator } from '../src/random_generator.js'

test.group('LootTable', () => {
  test('should throw an error when probability is not between 0 and 100', ({ assert }) => {
    const lootTable = new LootTable<string>()

    assert.throws(() => {
      lootTable.add(new WeightedList(), -1)
    })

    assert.throws(() => {
      lootTable.add(new WeightedList(), 101)
    })

    assert.doesNotThrow(() => {
      lootTable.add(new WeightedList(), 0)
    })

    assert.doesNotThrow(() => {
      lootTable.add(new WeightedList(), 100)
    })
  })

  test('should roll loot table', ({ assert }) => {
    const lootTable = new LootTable<string>()

    lootTable.add(new WeightedList<string>().add('sure_item', 50).add('sure_item2', 50), 100)
    lootTable.add(
      new WeightedList<string>().add('item', 25).add('item2', 25).add('item3', 50),
      50,
      new FakeRandomGenerator(20)
    )
    lootTable.add(new WeightedList<string>().add('item4', 100), 1, new FakeRandomGenerator(20))

    const rolledItems = lootTable.roll()

    assert.isNotEmpty(rolledItems)
    assert.lengthOf(rolledItems, 2)
    assert.include(['sure_item', 'sure_item2'], rolledItems[0])
    assert.include(['item', 'item2', 'item3'], rolledItems[1])

    console.log(rolledItems)
  })
})
